import type { Location, Ability } from '../types/game';

export const XP_PER_LEVEL = 100;

export function xpForLevel(lvl: number): number {
  return lvl * XP_PER_LEVEL;
}

export function xpProgress(xp: number, _level: number): number {
  const current = xp % XP_PER_LEVEL;
  return Math.min(100, Math.round((current / XP_PER_LEVEL) * 100));
}

export const LOCATIONS: Location[] = [
  {
    id: 'home',
    name: 'Уютный домик',
    emoji: '🏠',
    unlockLevel: 1,
    description: 'Стартовая локация — здесь живёт твой питомец',
  },
  {
    id: 'garden',
    name: 'Сад с цветами',
    emoji: '🌸',
    unlockLevel: 2,
    description: 'Открывается на 2 уровне — больше места для игр',
  },
  {
    id: 'park',
    name: 'Городской парк',
    emoji: '🌳',
    unlockLevel: 4,
    description: 'Прогулки и встречи с другими питомцами',
  },
  {
    id: 'beach',
    name: 'Пляж',
    emoji: '🏖️',
    unlockLevel: 6,
    description: 'Летние приключения и купание',
  },
  {
    id: 'castle',
    name: 'Волшебный замок',
    emoji: '🏰',
    unlockLevel: 8,
    description: 'Финальная локация для настоящих мастеров',
  },
];

export const ABILITIES: Ability[] = [
  {
    id: 'pet',
    name: 'Погладить',
    unlockLevel: 1,
    description: 'Базовое взаимодействие — +5 счастья',
  },
  {
    id: 'trick',
    name: 'Трюки',
    unlockLevel: 3,
    description: 'Питомец показывает «дай лапу»',
  },
  {
    id: 'dance',
    name: 'Танец',
    unlockLevel: 5,
    description: 'Весёлая анимация при взаимодействии',
  },
  {
    id: 'teleport',
    name: 'Телепорт',
    unlockLevel: 7,
    description: 'Мгновенный переход между локациями',
  },
];
