import {
  HandRaisedIcon,
  CakeIcon,
  SparklesIcon,
  MoonIcon,
} from '@heroicons/react/24/outline';
import { useGame } from '../../context/GameContext';
import { ABILITIES } from '../../data/levels';

const ACTIONS = [
  { id: 'pet' as const, label: 'Гладить', Icon: HandRaisedIcon, minLevel: 1 },
  { id: 'feed' as const, label: 'Корм', Icon: CakeIcon, minLevel: 1 },
  { id: 'play' as const, label: 'Игра', Icon: SparklesIcon, minLevel: 3 },
  { id: 'sleep' as const, label: 'Сон', Icon: MoonIcon, minLevel: 1 },
];

export function InteractionButtons({ mini }: { mini?: boolean }) {
  const { state, interact } = useGame();

  if (mini) {
    return (
      <div className="grid grid-cols-4 gap-1">
        {ACTIONS.map(({ id, Icon, minLevel }) => {
          const locked = state.level < minLevel;
          return (
            <button
              key={id}
              type="button"
              disabled={locked}
              onClick={() => interact(id)}
              title={locked ? `Ур. ${minLevel}` : undefined}
              className={`flex h-9 items-center justify-center rounded-lg border transition-colors ${
                locked
                  ? 'border-ink/10 bg-ink/5 opacity-40'
                  : 'border-white/80 bg-white/70 active:bg-coral/20'
              }`}
            >
              <Icon className="h-4 w-4 text-ink" />
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {ACTIONS.map(({ id, label, Icon, minLevel }) => {
        const locked = state.level < minLevel;
        const ability = ABILITIES.find((a) => a.id === id || (id === 'play' && a.id === 'trick'));

        return (
          <button
            key={id}
            type="button"
            disabled={locked}
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
          </button>
        );
      })}
    </div>
  );
}
