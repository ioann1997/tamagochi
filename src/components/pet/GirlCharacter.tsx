import { useEffect } from 'react';
import type { Mood } from '../../types/game';
import { MOOD_IMAGES } from '../../data/characterAssets';
import { MOOD_LABEL } from '../../utils/gameLogic';

interface GirlCharacterProps {
  mood: Mood;
}

export function GirlCharacter({ mood }: GirlCharacterProps) {
  useEffect(() => {
    Object.values(MOOD_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[5] flex items-center justify-center"
      aria-hidden
    >
      <img
        src={MOOD_IMAGES[mood]}
        alt={MOOD_LABEL[mood]}
        className="max-h-[58vh] w-auto max-w-[min(92vw,420px)] object-contain object-center drop-shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        draggable={false}
      />
    </div>
  );
}
