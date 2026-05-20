import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { DAILY_TASKS } from '../data/tasks';
import { REWARDS } from '../data/rewards';
import type { GameState, Notification, TabId } from '../types/game';
import {
  addXp,
  calculateMood,
} from '../utils/gameLogic';
import { checkRewards } from '../utils/rewards';
import {
  applyDailyReset,
  clearLocalState,
  DEFAULT_STATE,
  loadLocalState,
  saveLocalState,
} from '../constants/gameDefaults';
import { useAuth } from './AuthContext';
import {
  fetchGameState,
  saveGameState,
  type SyncStatus,
} from '../services/gameStateService';

interface GameContextValue {
  state: GameState;
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  notifications: Notification[];
  dismissNotification: (id: string) => void;
  completeTask: (taskId: string) => void;
  interact: (action: 'pet' | 'feed' | 'play' | 'sleep') => void;
  setPetName: (name: string) => void;
  resetProgress: () => void;
  newRewardIds: string[];
  clearNewRewards: () => void;
  syncStatus: SyncStatus;
  isCloudSync: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: ReactNode }) {
  const { user, firebaseReady } = useAuth();
  const [state, setState] = useState<GameState>(() =>
    applyDailyReset(loadLocalState()),
  );
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [newRewardIds, setNewRewardIds] = useState<string[]>([]);
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [gameReady, setGameReady] = useState(!firebaseReady);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const skipNextSaveRef = useRef(false);

  const isCloudSync = Boolean(user && firebaseReady);

  const pushNotification = useCallback(
    (message: string, type: Notification['type']) => {
      const id = `${Date.now()}-${Math.random()}`;
      setNotifications((prev) => [...prev, { id, message, type }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    },
    [],
  );

  useEffect(() => {
    if (!firebaseReady) {
      setGameReady(true);
      return;
    }

    if (!user) {
      skipNextSaveRef.current = true;
      setState(applyDailyReset(loadLocalState()));
      setSyncStatus('idle');
      setGameReady(true);
      return;
    }

    let cancelled = false;

    async function loadCloud() {
      setSyncStatus('loading');
      setGameReady(false);

      try {
        const local = applyDailyReset(loadLocalState());
        const remote = await fetchGameState(user!.uid);

        if (cancelled) return;

        if (remote) {
          skipNextSaveRef.current = true;
          setState(applyDailyReset(remote));
          saveLocalState(applyDailyReset(remote));
          setSyncStatus('synced');
        } else {
          skipNextSaveRef.current = true;
          setState(local);
          await saveGameState(user!.uid, local);
          setSyncStatus('synced');
          pushNotification('Прогресс сохранён в облаке', 'success');
        }
      } catch {
        if (!cancelled) {
          setState(applyDailyReset(loadLocalState()));
          setSyncStatus('error');
          pushNotification('Не удалось загрузить облако, используется локальный прогресс', 'success');
        }
      } finally {
        if (!cancelled) setGameReady(true);
      }
    }

    loadCloud();
    return () => {
      cancelled = true;
    };
  }, [user, firebaseReady, pushNotification]);

  useEffect(() => {
    if (!gameReady) return;
    saveLocalState(state);
  }, [state, gameReady]);

  useEffect(() => {
    if (!gameReady || !isCloudSync || !user) return;

    if (skipNextSaveRef.current) {
      skipNextSaveRef.current = false;
      return;
    }

    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    setSyncStatus('saving');
    saveTimerRef.current = setTimeout(async () => {
      try {
        await saveGameState(user.uid, state);
        setSyncStatus('synced');
      } catch {
        setSyncStatus('error');
      }
    }, 600);

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, user, isCloudSync, gameReady]);

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        const hunger = Math.max(0, prev.hunger - 2);
        const happiness = Math.max(0, prev.happiness - 1);
        const mood = calculateMood(
          { ...prev, hunger, happiness },
          DAILY_TASKS.length,
        );
        return { ...prev, hunger, happiness, mood };
      });
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const applyRewards = useCallback((next: GameState) => {
    const newIds = checkRewards(next);
    if (newIds.length === 0) return next;
    setNewRewardIds((prev) => [...prev, ...newIds]);
    newIds.forEach((id) => {
      const r = REWARDS.find((x) => x.id === id);
      if (r) pushNotification(`Награда: ${r.title}! ${r.icon}`, 'reward');
    });
    return {
      ...next,
      unlockedRewardIds: [...next.unlockedRewardIds, ...newIds],
    };
  }, [pushNotification]);

  const completeTask = useCallback(
    (taskId: string) => {
      const task = DAILY_TASKS.find((t) => t.id === taskId);
      if (!task) return;

      setState((prev) => {
        if (prev.completedTaskIds.includes(taskId)) return prev;

        let next: GameState = {
          ...prev,
          completedTaskIds: [...prev.completedTaskIds, taskId],
          coins: prev.coins + task.coinReward,
          happiness: Math.min(100, prev.happiness + 15),
          hunger: Math.min(100, prev.hunger + 10),
          totalTasksCompleted: prev.totalTasksCompleted + 1,
        };

        const beforeLevel = next.level;
        next = addXp(next, task.xpReward);
        next.mood = calculateMood(next, DAILY_TASKS.length);

        if (next.level > beforeLevel) {
          pushNotification(`Уровень ${next.level}! Новые возможности открыты`, 'levelup');
        } else {
          pushNotification(`+${task.xpReward} XP, +${task.coinReward} монет`, 'success');
        }

        return applyRewards(next);
      });
    },
    [applyRewards, pushNotification],
  );

  const interact = useCallback(
    (action: 'pet' | 'feed' | 'play' | 'sleep') => {
      setState((prev) => {
        let happiness = prev.happiness;
        let hunger = prev.hunger;
        let xpGain = 5;

        switch (action) {
          case 'pet':
            happiness = Math.min(100, happiness + 8);
            break;
          case 'feed':
            hunger = Math.min(100, hunger + 20);
            happiness = Math.min(100, happiness + 5);
            xpGain = 10;
            break;
          case 'play':
            happiness = Math.min(100, happiness + 15);
            hunger = Math.max(0, hunger - 5);
            xpGain = 15;
            break;
          case 'sleep':
            happiness = Math.min(100, happiness + 10);
            hunger = Math.max(0, hunger - 8);
            xpGain = 8;
            break;
        }

        let next = addXp(
          {
            ...prev,
            happiness,
            hunger,
            interactionsToday: prev.interactionsToday + 1,
          },
          xpGain,
        );
        next.mood = calculateMood(next, DAILY_TASKS.length);
        return next;
      });
    },
    [],
  );

  const setPetName = useCallback((name: string) => {
    setState((prev) => ({ ...prev, petName: name.trim() || 'Пушистик' }));
  }, []);

  const resetProgress = useCallback(async () => {
    clearLocalState();
    skipNextSaveRef.current = true;
    setState(DEFAULT_STATE);
    setNewRewardIds([]);

    if (user) {
      try {
        await saveGameState(user.uid, DEFAULT_STATE);
        setSyncStatus('synced');
      } catch {
        setSyncStatus('error');
      }
    }

    pushNotification('Прогресс сброшен', 'success');
  }, [user, pushNotification]);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const clearNewRewards = useCallback(() => setNewRewardIds([]), []);

  const value = useMemo(
    () => ({
      state,
      activeTab,
      setActiveTab,
      notifications,
      dismissNotification,
      completeTask,
      interact,
      setPetName,
      resetProgress,
      newRewardIds,
      clearNewRewards,
      syncStatus,
      isCloudSync,
    }),
    [
      state,
      activeTab,
      notifications,
      dismissNotification,
      completeTask,
      interact,
      setPetName,
      resetProgress,
      newRewardIds,
      clearNewRewards,
      syncStatus,
      isCloudSync,
    ],
  );

  if (!gameReady) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-cream">
        <p className="animate-pulse font-bold text-ink">Загрузка прогресса…</p>
      </div>
    );
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
