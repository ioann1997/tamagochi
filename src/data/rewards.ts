import type { Reward } from '../types/game';

export const REWARDS: Reward[] = [
  {
    id: 'first-task',
    title: 'Первый шаг',
    description: 'Выполни первое задание',
    icon: '🌱',
    requiredLevel: 1,
    requiredTasks: 1,
  },
  {
    id: 'task-master',
    title: 'Мастер заданий',
    description: 'Выполни 10 заданий за всё время',
    icon: '⭐',
    requiredLevel: 1,
    requiredTasks: 10,
  },
  {
    id: 'level-3',
    title: 'Подросший',
    description: 'Достигни 3 уровня',
    icon: '🎀',
    requiredLevel: 3,
  },
  {
    id: 'level-5',
    title: 'Исследователь',
    description: 'Достигни 5 уровня',
    icon: '🗺️',
    requiredLevel: 5,
  },
  {
    id: 'level-7',
    title: 'Легенда',
    description: 'Достигни 7 уровня',
    icon: '👑',
    requiredLevel: 7,
  },
  {
    id: 'rich',
    title: 'Копилка',
    description: 'Накопи 100 монет',
    icon: '💰',
    requiredLevel: 1,
  },
  {
    id: 'happy-week',
    title: 'Счастливчик',
    description: 'Держи настроение «радость» 3 дня подряд',
    icon: '😊',
    requiredLevel: 2,
  },
  {
    id: 'all-tasks',
    title: 'Идеальный день',
    description: 'Выполни все задания за один день',
    icon: '🏆',
    requiredLevel: 1,
  },
];
