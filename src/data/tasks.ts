import type { Task } from '../types/game';

export const DAILY_TASKS: Task[] = [
  {
    id: 'water',
    title: 'Напоить питомца',
    description: 'Дай свежей воды — +15 счастья',
    xpReward: 20,
    coinReward: 5,
  },
  {
    id: 'feed',
    title: 'Покормить',
    description: 'Вкусный обед — сытость +25',
    xpReward: 25,
    coinReward: 8,
  },
  {
    id: 'play',
    title: 'Поиграть 10 минут',
    description: 'Мячик или лазерная указка',
    xpReward: 30,
    coinReward: 10,
  },
  {
    id: 'walk',
    title: 'Прогулка',
    description: 'Свежий воздух и новые запахи',
    xpReward: 35,
    coinReward: 12,
  },
  {
    id: 'clean',
    title: 'Убрать домик',
    description: 'Чистота — залог здоровья',
    xpReward: 20,
    coinReward: 6,
  },
  {
    id: 'learn',
    title: 'Выучить трюк',
    description: '«Дай лапу» или «Кувырок»',
    xpReward: 40,
    coinReward: 15,
  },
];
