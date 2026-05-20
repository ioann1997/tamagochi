import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { REWARDS } from '../data/rewards';

export function RewardsPage() {
  const { state, newRewardIds, clearNewRewards } = useGame();

  useEffect(() => {
    return () => clearNewRewards();
  }, [clearNewRewards]);

  return (
    <div className="p-4 md:p-8">
      <h2 className="mb-2 text-2xl font-extrabold text-ink">Поощрения и награды</h2>
      <p className="mb-8 text-ink/60">
        Открыто: {state.unlockedRewardIds.length} из {REWARDS.length}
      </p>

      <div className="overflow-x-auto rounded-2xl border-2 border-lavender/40 bg-panel shadow-md">
        <table className="w-full min-w-[480px] text-left text-sm">
          <thead>
            <tr className="border-b-2 border-lavender/30 bg-lavender/20">
              <th className="px-4 py-3 font-bold">Награда</th>
              <th className="px-4 py-3 font-bold">Описание</th>
              <th className="px-4 py-3 font-bold">Условие</th>
              <th className="px-4 py-3 font-bold text-center">Статус</th>
            </tr>
          </thead>
          <tbody>
            {REWARDS.map((reward) => {
              const unlocked = state.unlockedRewardIds.includes(reward.id);
              const isNew = newRewardIds.includes(reward.id);

              return (
                <tr
                  key={reward.id}
                  className={`border-b border-lavender/20 ${unlocked ? 'bg-mint/10' : ''}`}
                >
                  <td className="px-4 py-4">
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={unlocked ? 'unlocked' : 'locked'}
                        initial={isNew ? { scale: 0, rotate: -180 } : false}
                        animate={{ scale: 1, rotate: 0 }}
                        className="inline-block text-2xl"
                      >
                        {unlocked ? reward.icon : '🔒'}
                      </motion.span>
                    </AnimatePresence>
                    <span className="ml-2 font-bold">{reward.title}</span>
                  </td>
                  <td className="px-4 py-3 text-ink/70">{reward.description}</td>
                  <td className="px-4 py-3 text-ink/60">
                    {reward.requiredLevel > 1 && `Ур. ${reward.requiredLevel}`}
                    {reward.requiredTasks && ` · ${reward.requiredTasks} заданий`}
                    {reward.id === 'rich' && ' · 100 монет'}
                    {reward.id === 'all-tasks' && ' · все за день'}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {unlocked ? (
                      <motion.span
                        initial={isNew ? { scale: 0 } : false}
                        animate={{ scale: 1 }}
                        className="inline-block rounded-full bg-mint px-3 py-1 text-xs font-bold"
                      >
                        {isNew ? '✨ Новое!' : '✓'}
                      </motion.span>
                    ) : (
                      <span className="text-ink/30">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
