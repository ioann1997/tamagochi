export type Mood = 'happy' | 'excited' | 'neutral' | 'bored' | 'sad';

export type TabId = 'home' | 'tasks' | 'rules' | 'rewards' | 'levels';

export interface Task {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  pointsReward: number;
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  cost: number;
}

export interface Location {
  id: string;
  name: string;
  emoji: string;
  unlockLevel: number;
  description: string;
}

export interface Ability {
  id: string;
  name: string;
  unlockLevel: number;
  description: string;
}

export interface GameState {
  petName: string;
  level: number;
  xp: number;
  coins: number;
  mood: Mood;
  hunger: number;
  happiness: number;
  completedTaskIds: string[];
  purchasedRewardIds: string[];
  lastTaskResetDate: string;
  totalTasksCompleted: number;
  interactionsToday: number;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'levelup' | 'reward';
}
