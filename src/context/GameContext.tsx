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
import { DAILY_TASKS, ALL_TASKS_BONUS_POINTS } from '../data/tasks';
import { REWARDS } from '../data/rewards';
import type { GameState, Notification, TabId } from '../types/game';
import {
  addXp,
  calculateMood,
} from '../utils/gameLogic';
import {
  applyDailyReset,
  clearLocalState,
  DEFAULT_STATE,
  loadLocalState,
  migrateState,
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
  purchaseReward: (rewardId: string) => void;
  interact: (action: 'pet' | 'feed' | 'play' | 'sleep') => void;
  setPetName: (name: string) => void;
  resetProgress: () => void;
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
          const normalized = applyDailyReset(migrateState(remote));
          setState(normalized);
          saveLocalState(normalized);
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

  const completeTask = useCallback(
    (taskId: string) => {
      const task = DAILY_TASKS.find((t) => t.id === taskId);
      if (!task) return;

      setState((prev) => {
        if (prev.completedTaskIds.includes(taskId)) return prev;

        const completedTaskIds = [...prev.completedTaskIds, taskId];
        const allDone = completedTaskIds.length === DAILY_TASKS.length;
        let pointsGain = task.pointsReward;
        if (allDone) pointsGain += ALL_TASKS_BONUS_POINTS;

        let next: GameState = {
          ...prev,
          completedTaskIds,
          coins: prev.coins + pointsGain,
          happiness: Math.min(100, prev.happiness + 12),
          hunger: Math.min(100, prev.hunger + 8),
          totalTasksCompleted: prev.totalTasksCompleted + 1,
        };

        const beforeLevel = next.level;
        next = addXp(next, task.xpReward);
        next.mood = calculateMood(next, DAILY_TASKS.length);

        if (next.level > beforeLevel) {
          next.coins += 10;
          pushNotification(`Уровень ${next.level}! +10 баллов`, 'levelup');
        } else if (allDone) {
          pushNotification(
            `+${task.pointsReward} баллов · бонус за все дейлики +${ALL_TASKS_BONUS_POINTS}`,
            'success',
          );
        } else {
          pushNotification(`+${task.pointsReward} баллов`, 'success');
        }

        return next;
      });
    },
    [pushNotification],
  );

  const purchaseReward = useCallback(
    (rewardId: string) => {
      const reward = REWARDS.find((r) => r.id === rewardId);
      if (!reward) return;

      setState((prev) => {
        if (prev.purchasedRewardIds.includes(rewardId)) {
          pushNotification('Эта награда уже выбрана', 'success');
          return prev;
        }
        if (prev.coins < reward.cost) {
          pushNotification(`Нужно ещё ${reward.cost - prev.coins} баллов`, 'success');
          return prev;
        }

        pushNotification(`${reward.icon} ${reward.title} — ваша награда!`, 'reward');

        return {
          ...prev,
          coins: prev.coins - reward.cost,
          purchasedRewardIds: [...prev.purchasedRewardIds, rewardId],
        };
      });
    },
    [pushNotification],
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

  const value = useMemo(
    () => ({
      state,
      activeTab,
      setActiveTab,
      notifications,
      dismissNotification,
      completeTask,
      purchaseReward,
      interact,
      setPetName,
      resetProgress,
      syncStatus,
      isCloudSync,
    }),
    [
      state,
      activeTab,
      notifications,
      dismissNotification,
      completeTask,
      purchaseReward,
      interact,
      setPetName,
      resetProgress,
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
