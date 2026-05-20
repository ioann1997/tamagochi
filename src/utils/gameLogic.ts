import type { GameState, Mood } from '../types/game';
import { XP_PER_LEVEL } from '../data/levels';

export function getTodayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function calculateMood(state: GameState, tasksTotal: number): Mood {
  const completedToday = state.completedTaskIds.length;
  const ratio = tasksTotal > 0 ? completedToday / tasksTotal : 0;

  if (state.happiness >= 80 && ratio >= 0.8) return 'excited';
  if (state.happiness >= 60 || ratio >= 0.5) return 'happy';
  if (state.hunger < 30 || state.happiness < 30) return 'sad';
  if (ratio === 0 && state.happiness < 50) return 'bored';
  return 'neutral';
}

export function addXp(state: GameState, amount: number): GameState {
  let { level, xp } = state;
  xp += amount;

  while (xp >= level * XP_PER_LEVEL) {
    xp -= level * XP_PER_LEVEL;
    level += 1;
  }

  return { ...state, level, xp };
}

export const MOOD_EMOJI: Record<Mood, string> = {
  happy: '😊',
  excited: '🤩',
  neutral: '😐',
  bored: '😑',
  sad: '😢',
};

export const MOOD_LABEL: Record<Mood, string> = {
  happy: 'Радость',
  excited: 'Восторг',
  neutral: 'Спокойствие',
  bored: 'Скука',
  sad: 'Грусть',
};
