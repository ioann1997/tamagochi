import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { TaskList } from '../components/tasks/TaskList';
import { DAILY_TASKS } from '../data/tasks';

export function TasksPage() {
  const { state } = useGame();
  const done = state.completedTaskIds.length;
  const totalXp = state.completedTaskIds.reduce((sum, id) => {
    const t = DAILY_TASKS.find((x) => x.id === id);
    return sum + (t?.xpReward ?? 0);
  }, 0);
  const totalCoins = state.completedTaskIds.reduce((sum, id) => {
    const t = DAILY_TASKS.find((x) => x.id === id);
    return sum + (t?.coinReward ?? 0);
  }, 0);

  return (
    <div className="p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h2 className="text-2xl font-extrabold text-ink">Задания на день</h2>
        <p className="mt-1 text-ink/60">
          Выполняй задания до полуночи — список обновится автоматически
        </p>
      </motion.div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border-2 border-mint bg-mint/30 p-4 text-center">
          <p className="text-3xl font-extrabold text-ink">
            {done}/{DAILY_TASKS.length}
          </p>
          <p className="text-sm font-semibold text-ink/70">Выполнено</p>
        </div>
        <div className="rounded-2xl border-2 border-sky bg-sky/30 p-4 text-center">
          <p className="text-3xl font-extrabold text-ink">+{totalXp}</p>
          <p className="text-sm font-semibold text-ink/70">XP сегодня</p>
        </div>
        <div className="rounded-2xl border-2 border-sun bg-sun/30 p-4 text-center">
          <p className="text-3xl font-extrabold text-ink">+{totalCoins} 🪙</p>
          <p className="text-sm font-semibold text-ink/70">Монеты сегодня</p>
        </div>
      </div>

      {done === DAILY_TASKS.length && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mb-6 rounded-2xl border-2 border-sun bg-sun/40 p-4 text-center font-bold text-ink"
        >
          🏆 Идеальный день! Все задания выполнены!
        </motion.div>
      )}

      <TaskList />
    </div>
  );
}
