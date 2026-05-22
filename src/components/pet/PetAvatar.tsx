import { motion, type TargetAndTransition } from 'framer-motion';
import type { Mood } from '../../types/game';
import { MOOD_IMAGES, ROOM_IMAGE } from '../../data/characterAssets';
import { MOOD_LABEL } from '../../utils/gameLogic';

const MOOD_ANIMATION: Record<Mood, TargetAndTransition | undefined> = {
  happy: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 1.2 } },
  excited: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 0.8 } },
  neutral: undefined,
  bored: { x: [0, -6, 6, 0], transition: { repeat: Infinity, duration: 2.5 } },
  sad: { y: [0, 6, 0], transition: { repeat: Infinity, duration: 2 } },
};

interface PetAvatarProps {
  mood: Mood;
  petName: string;
  level: number;
  locationEmoji?: string;
}

export function PetAvatar({ mood, petName, level, locationEmoji }: PetAvatarProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full overflow-hidden rounded-2xl shadow-inner">
        <img
          src={ROOM_IMAGE}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {locationEmoji && (
          <span className="absolute right-3 top-3 z-20 rounded-full bg-panel/80 px-2 py-1 text-xl shadow-md backdrop-blur-sm">
            {locationEmoji}
          </span>
        )}

        <div className="relative flex min-h-[280px] items-end justify-center px-4 pb-2 pt-6 sm:min-h-[320px] md:min-h-[360px]">
          <motion.img
            key={mood}
            src={MOOD_IMAGES[mood]}
            alt={MOOD_LABEL[mood]}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={
              MOOD_ANIMATION[mood]
                ? { opacity: 1, ...MOOD_ANIMATION[mood] }
                : { opacity: 1, scale: 1 }
            }
            transition={{ opacity: { duration: 0.25 }, scale: { duration: 0.25 } }}
            className="relative z-10 max-h-[240px] w-auto max-w-[85%] object-contain object-bottom drop-shadow-lg sm:max-h-[280px] md:max-h-[320px]"
            draggable={false}
          />
        </div>
      </div>

      <h2 className="mt-4 text-2xl font-extrabold text-ink">{petName}</h2>
      <p className="text-sm font-semibold text-ink/70">
        {MOOD_LABEL[mood]} · Ур. {level}
      </p>
    </div>
  );
}
