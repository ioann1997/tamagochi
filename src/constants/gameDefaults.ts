import type { GameState } from '../types/game';
import { getTodayKey } from '../utils/gameLogic';

export const STORAGE_KEY = 'tamagotchi-game-state';

export const DEFAULT_STATE: GameState = {
  petName: 'Пушистик',
  level: 1,
  xp: 0,
  coins: 0,
  mood: 'neutral',
  hunger: 70,
  happiness: 60,
  completedTaskIds: [],
  unlockedRewardIds: [],
  lastTaskResetDate: getTodayKey(),
  totalTasksCompleted: 0,
  interactionsToday: 0,
};

export function loadLocalState(): GameState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    /* ignore */
  }
  return DEFAULT_STATE;
}

export function applyDailyReset(state: GameState): GameState {
  if (state.lastTaskResetDate === getTodayKey()) return state;
  return {
    ...state,
    completedTaskIds: [],
    lastTaskResetDate: getTodayKey(),
    interactionsToday: 0,
  };
}

export function saveLocalState(state: GameState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function clearLocalState(): void {
  localStorage.removeItem(STORAGE_KEY);
}
