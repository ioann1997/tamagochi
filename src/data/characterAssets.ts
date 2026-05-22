import type { Mood } from '../types/game';

export const ROOM_IMAGE = '/assets/girl/room.png';

/** Соответствие настроений игры и изображений девочки */
export const MOOD_IMAGES: Record<Mood, string> = {
  excited: '/assets/girl/excited.png',
  happy: '/assets/girl/happy.png',
  neutral: '/assets/girl/neutral.png',
  bored: '/assets/girl/bored.png',
  sad: '/assets/girl/sad.png',
};
