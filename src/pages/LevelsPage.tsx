import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { LOCATIONS, ABILITIES, xpProgress, XP_PER_LEVEL } from '../data/levels';

export function LevelsPage() {
  const { state, resetProgress } = useGame();
  const progress = xpProgress(state.xp, state.level);

  return (
    <div className="p-4 md:p-8">
      <h2 className="mb-2 text-2xl font-extrabold text-ink">Цели и уровни</h2>
      <p className="mb-8 text-ink/60">Прогресс, локации и способности</p>

      <section className="mb-10 rounded-3xl border-2 border-sky/50 bg-gradient-to-br from-sky/30 to-lavender/30 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-ink/60">Текущий уровень</p>
            <p className="text-5xl font-extrabold text-ink">{state.level}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-ink/60">До следующего</p>
            <p className="text-xl font-bold text-ink">
              {state.xp} / {state.level * XP_PER_LEVEL} XP
            </p>
          </div>
        </div>
        <div className="mt-4 h-4 overflow-hidden rounded-full bg-panel/80">
          <motion.div
            className="h-full rounded-full bg-sky"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <p className="mt-2 text-center text-sm font-semibold text-ink/70">
          Всего заданий выполнено: {state.totalTasksCompleted}
        </p>
      </section>

      <div className="mb-10 grid gap-8 lg:grid-cols-2">
        <section>
          <h3 className="mb-4 text-lg font-extrabold text-ink">🗺️ Локации</h3>
          <ul className="space-y-3">
            {LOCATIONS.map((loc) => {
              const open = state.level >= loc.unlockLevel;
              return (
                <li
                  key={loc.id}
                  className={`flex items-center gap-4 rounded-2xl border-2 p-4 ${
                    open
                      ? 'border-mint bg-mint/20'
                      : 'border-ink/10 bg-ink/5 opacity-60'
                  }`}
                >
                  <span className="text-3xl">{open ? loc.emoji : '🔒'}</span>
                  <div className="text-left">
                    <p className="font-bold text-ink">{loc.name}</p>
                    <p className="text-xs text-ink/60">{loc.description}</p>
                    {!open && (
                      <p className="mt-1 text-xs font-semibold text-coral">
                        Ур. {loc.unlockLevel}
                      </p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="mb-4 text-lg font-extrabold text-ink">⚡ Способности</h3>
          <ul className="space-y-3">
            {ABILITIES.map((ab) => {
              const open = state.level >= ab.unlockLevel;
              return (
                <li
                  key={ab.id}
                  className={`rounded-2xl border-2 p-4 text-left ${
                    open
                      ? 'border-lavender bg-lavender/20'
                      : 'border-ink/10 bg-ink/5 opacity-60'
                  }`}
                >
                  <p className="font-bold text-ink">
                    {open ? '✓' : '🔒'} {ab.name}
                  </p>
                  <p className="text-xs text-ink/60">{ab.description}</p>
                  {!open && (
                    <p className="mt-1 text-xs font-semibold text-coral">
                      Ур. {ab.unlockLevel}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm('Сбросить весь прогресс? Это нельзя отменить.')) {
            resetProgress();
          }
        }}
        className="rounded-xl border-2 border-coral/50 px-4 py-2 text-sm font-semibold text-coral hover:bg-coral/10"
      >
        Сбросить прогресс
      </button>
    </div>
  );
}
