import { useGame } from '../context/GameContext';
import { REWARDS } from '../data/rewards';
import { ContentPanel } from '../components/layout/ContentPanel';

export function RewardsPage() {
  const { state } = useGame();

  return (
    <ContentPanel className="max-h-[32vh]">
      <h2 className="mb-1.5 text-xs font-extrabold text-ink">
        Награды {state.unlockedRewardIds.length}/{REWARDS.length}
      </h2>
      <ul className="grid grid-cols-4 gap-1">
        {REWARDS.map((r) => {
          const unlocked = state.unlockedRewardIds.includes(r.id);
          return (
            <li
              key={r.id}
              title={`${r.title}: ${r.description}`}
              className={`flex flex-col items-center rounded-lg px-0.5 py-1 text-center ${
                unlocked ? 'bg-mint/50' : 'bg-ink/5 opacity-70'
              }`}
            >
              <span className="text-base leading-none">{unlocked ? r.icon : '🔒'}</span>
              <span className="mt-0.5 line-clamp-2 text-[8px] font-bold leading-tight text-ink">
                {r.title}
              </span>
            </li>
          );
        })}
      </ul>
    </ContentPanel>
  );
}
