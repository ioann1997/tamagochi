import { useGame } from '../context/GameContext';
import { xpProgress } from '../data/levels';
import { MOOD_LABEL } from '../utils/gameLogic';
import { ContentPanel } from '../components/layout/ContentPanel';
import { StatBar } from '../components/pet/StatBar';
import { InteractionButtons } from '../components/pet/InteractionButtons';

export function HomePage() {
  const { state } = useGame();
  const progress = xpProgress(state.xp, state.level);

  return (
    <ContentPanel className="max-h-[32vh] space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs font-extrabold text-ink">{state.petName}</p>
        <p className="shrink-0 text-[10px] font-semibold text-ink/60">{MOOD_LABEL[state.mood]}</p>
      </div>

      <div className="space-y-1">
        <StatBar mini label="XP" value={progress} color="bg-sky" icon="✨" />
        <StatBar mini label="Сытость" value={state.hunger} color="bg-sun" icon="🍽" />
        <StatBar mini label="Счастье" value={state.happiness} color="bg-coral" icon="♥" />
      </div>

      <InteractionButtons mini />
    </ContentPanel>
  );
}
