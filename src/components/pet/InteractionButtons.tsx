import { motion } from 'framer-motion';
import {
  HandRaisedIcon,
  CakeIcon,
  SparklesIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useGame } from '../../context/GameContext';
import { ABILITIES } from '../../data/levels';

const ACTIONS = [
  { id: 'pet' as const, label: 'Погладить', Icon: HandRaisedIcon, minLevel: 1 },
  { id: 'feed' as const, label: 'Покормить', Icon: CakeIcon, minLevel: 1 },
  { id: 'play' as const, label: 'Играть', Icon: SparklesIcon, minLevel: 3 },
  { id: 'sleep' as const, label: 'Сон', Icon: MoonIcon, minLevel: 1 },
];

export function InteractionButtons() {
  const { state, interact } = useGame();

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ACTIONS.map(({ id, label, Icon, minLevel }) => {
        const locked = state.level < minLevel;
        const ability = ABILITIES.find((a) => a.id === id || (id === 'play' && a.id === 'trick'));

        return (
          <motion.button
            key={id}
            type="button"
            disabled={locked}
            whileHover={locked ? {} : { scale: 1.05 }}
            whileTap={locked ? {} : { scale: 0.95 }}
            onClick={() => interact(id)}
            className={`flex flex-col items-center gap-2 rounded-2xl border-2 px-4 py-4 font-semibold transition-colors ${
              locked
                ? 'cursor-not-allowed border-ink/10 bg-ink/5 text-ink/30'
                : 'border-coral/40 bg-panel text-ink shadow-md hover:border-coral hover:bg-coral/10'
            }`}
            title={locked ? `Откроется на ур. ${minLevel}` : ability?.description}
          >
            <Icon className="h-6 w-6" />
            <span className="text-sm">{label}</span>
            {locked && <span className="text-xs">🔒 ур. {minLevel}</span>}
          </motion.button>
        );
      })}
    </div>
  );
}
