import { useGame } from '../context/GameContext';
import { LOCATIONS, xpProgress, XP_PER_LEVEL } from '../data/levels';
import { ContentPanel } from '../components/layout/ContentPanel';

export function LevelsPage() {
  const { state } = useGame();
  const progress = xpProgress(state.xp, state.level);

  return (
    <ContentPanel className="max-h-[32vh] space-y-1.5">
      <div className="flex items-center justify-between text-xs font-extrabold text-ink">
        <span>Уровень {state.level}</span>
        <span className="text-[10px] font-semibold text-ink/60">
          {state.xp}/{state.level * XP_PER_LEVEL} XP
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-ink/10">
        <div className="h-full rounded-full bg-sky transition-all" style={{ width: `${progress}%` }} />
      </div>

      <ul className="grid grid-cols-2 gap-1">
        {LOCATIONS.slice(0, 4).map((loc) => {
          const open = state.level >= loc.unlockLevel;
          return (
            <li
              key={loc.id}
              className={`flex items-center gap-1 rounded-lg px-1.5 py-1 text-[9px] font-semibold ${
                open ? 'bg-mint/40 text-ink' : 'bg-ink/5 text-ink/40'
              }`}
            >
              <span>{open ? loc.emoji : '🔒'}</span>
              <span className="truncate">{loc.name}</span>
            </li>
          );
        })}
      </ul>
    </ContentPanel>
  );
}
