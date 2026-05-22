import { useGame } from '../context/GameContext';
import { REWARDS } from '../data/rewards';
import { ContentPanel } from '../components/layout/ContentPanel';

export function RewardsPage() {
  const { state, purchaseReward } = useGame();

  return (
    <ContentPanel className="max-h-[32vh] overflow-hidden">
      <div className="mb-1 flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-ink">Награды</h2>
        <span className="text-[10px] font-bold text-coral">★ {state.coins} баллов</span>
      </div>
      <p className="mb-1 text-[9px] text-ink/60">Выбери награду за заработанные баллы</p>
      <ul className="max-h-[22vh] space-y-1 overflow-y-auto pr-0.5">
        {REWARDS.map((r) => {
          const bought = state.purchasedRewardIds.includes(r.id);
          const canBuy = !bought && state.coins >= r.cost;
          return (
            <li
              key={r.id}
              className={`flex items-center gap-1 rounded-lg border px-1.5 py-1 ${
                bought ? 'border-mint/60 bg-mint/30' : 'border-white/70 bg-white/60'
              }`}
            >
              <span className="text-sm">{r.icon}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[10px] font-bold text-ink">{r.title}</p>
                <p className="text-[9px] text-ink/55">{r.cost} баллов</p>
              </div>
              {bought ? (
                <span className="shrink-0 text-[9px] font-bold text-mint">✓</span>
              ) : (
                <button
                  type="button"
                  disabled={!canBuy}
                  onClick={() => purchaseReward(r.id)}
                  className={`shrink-0 rounded px-1.5 py-0.5 text-[9px] font-bold ${
                    canBuy
                      ? 'bg-coral text-white'
                      : 'bg-ink/10 text-ink/35'
                  }`}
                >
                  Взять
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </ContentPanel>
  );
}
