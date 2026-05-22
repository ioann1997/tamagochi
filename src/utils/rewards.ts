import { DAILY_TASKS, ALL_TASKS_BONUS_POINTS } from '../data/tasks';
import type { GameState } from '../types/game';

/** Бонус баллов, если выполнены все дейлики за день */
export function allTasksBonus(state: GameState): number {
  if (state.completedTaskIds.length !== DAILY_TASKS.length) return 0;
  return ALL_TASKS_BONUS_POINTS;
}
