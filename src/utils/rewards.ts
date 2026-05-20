import { DAILY_TASKS } from '../data/tasks';
import { REWARDS } from '../data/rewards';
import type { GameState } from '../types/game';

export function checkRewards(state: GameState): string[] {
  const newlyUnlocked: string[] = [];

  for (const reward of REWARDS) {
    if (state.unlockedRewardIds.includes(reward.id)) continue;

    let unlocked = false;

    if (reward.requiredLevel && state.level >= reward.requiredLevel) {
      if (reward.id.startsWith('level-')) unlocked = true;
    }
    if (reward.requiredTasks && state.totalTasksCompleted >= reward.requiredTasks) {
      unlocked = true;
    }
    if (reward.id === 'rich' && state.coins >= 100) unlocked = true;
    if (reward.id === 'all-tasks' && state.completedTaskIds.length >= DAILY_TASKS.length) {
      unlocked = true;
    }
    if (reward.id === 'first-task' && state.totalTasksCompleted >= 1) unlocked = true;

    if (unlocked) newlyUnlocked.push(reward.id);
  }

  return newlyUnlocked;
}
