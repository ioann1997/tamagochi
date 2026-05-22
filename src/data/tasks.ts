import type { Task } from '../types/game';

/** Ежедневные дейлики — за выполнение начисляются баллы */
export const DAILY_TASKS: Task[] = [
  {
    id: 'water',
    title: 'Выпить литр воды',
    description: '1 л воды за день',
    xpReward: 15,
    pointsReward: 12,
  },
  {
    id: 'steps',
    title: '6000 шагов',
    description: 'Пройти или пробежать',
    xpReward: 20,
    pointsReward: 15,
  },
  {
    id: 'videos',
    title: 'Обучающие видео',
    description: 'Посмотреть и рассказать в сообщении',
    xpReward: 25,
    pointsReward: 20,
  },
  {
    id: 'games',
    title: 'Поиграть в игры',
    description: 'Любимые игры сегодня',
    xpReward: 15,
    pointsReward: 10,
  },
  {
    id: 'breakfast',
    title: 'Позавтракала',
    description: 'Завтрак едой',
    xpReward: 15,
    pointsReward: 10,
  },
];

export const ALL_TASKS_BONUS_POINTS = 25;
