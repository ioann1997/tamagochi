import { motion, type TargetAndTransition } from 'framer-motion';
import type { Mood } from '../../types/game';
import { MOOD_EMOJI, MOOD_LABEL } from '../../utils/gameLogic';

const MOOD_ANIMATION: Record<Mood, TargetAndTransition | undefined> = {
  happy: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 1.2 } },
  excited: { scale: [1, 1.08, 1], rotate: [0, -3, 3, 0], transition: { repeat: Infinity, duration: 0.8 } },
  neutral: undefined,
  bored: { x: [0, -4, 4, 0], transition: { repeat: Infinity, duration: 2.5 } },
  sad: { y: [0, 4, 0], transition: { repeat: Infinity, duration: 2 } },
};

interface PetAvatarProps {
  mood: Mood;
  petName: string;
  level: number;
  locationEmoji: string;
}

export function PetAvatar({ mood, petName, level, locationEmoji }: PetAvatarProps) {
  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={MOOD_ANIMATION[mood]}
        className="relative flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-sky/60 to-lavender/60 shadow-inner md:h-52 md:w-52"
      >
        <span className="absolute -right-2 -top-2 text-3xl">{locationEmoji}</span>
        <motion.span
          key={mood}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-7xl md:text-8xl"
          role="img"
          aria-label={MOOD_LABEL[mood]}
        >
          {MOOD_EMOJI[mood]}
        </motion.span>
      </motion.div>

      <h2 className="mt-4 text-2xl font-extrabold text-ink">{petName}</h2>
      <p className="text-sm font-semibold text-ink/70">
        {MOOD_LABEL[mood]} · Ур. {level}
      </p>
    </div>
  );
}
