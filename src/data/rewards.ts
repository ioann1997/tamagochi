import type { Reward } from '../types/game';

/** Награды в магазине — покупаются за баллы */
export const REWARDS: Reward[] = [
  {
    id: 'lip-piercing',
    title: 'Прокол губы',
    description: 'Награда за накопленные баллы',
    icon: '💋',
    cost: 80,
  },
  {
    id: 'manicure',
    title: 'Маникюр',
    description: 'Награда за накопленные баллы',
    icon: '💅',
    cost: 50,
  },
  {
    id: 'zppp',
    title: 'ЗППП',
    description: 'Награда за накопленные баллы',
    icon: '🏥',
    cost: 60,
  },
  {
    id: 'ozon',
    title: 'Покупочки Ozon',
    description: 'Награда за накопленные баллы',
    icon: '📦',
    cost: 40,
  },
  {
    id: 'bars',
    title: 'Бары / клубы',
    description: 'Награда за накопленные баллы',
    icon: '🍸',
    cost: 70,
  },
  {
    id: 'entrance',
    title: 'Подъезд',
    description: 'Награда за накопленные баллы',
    icon: '🏠',
    cost: 35,
  },
  {
    id: 'tattoo',
    title: 'Татуировки',
    description: 'Награда за накопленные баллы',
    icon: '🎨',
    cost: 100,
  },
];
