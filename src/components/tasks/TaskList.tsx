import { motion } from 'framer-motion';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { useGame } from '../../context/GameContext';
import { DAILY_TASKS } from '../../data/tasks';

export function TaskList({ compact = false }: { compact?: boolean }) {
  const { state, completeTask } = useGame();

  return (
    <ul className={`flex flex-col gap-3 ${compact ? '' : 'max-w-2xl'}`}>
      {DAILY_TASKS.map((task, i) => {
        const done = state.completedTaskIds.includes(task.id);
        return (
          <motion.li
            key={task.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`flex items-start gap-4 rounded-2xl border-2 p-4 transition-colors ${
              done
                ? 'border-mint bg-mint/20'
                : 'border-lavender/50 bg-panel shadow-sm'
            }`}
          >
            <button
              type="button"
              disabled={done}
              onClick={() => completeTask(task.id)}
              className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                done
                  ? 'border-mint bg-mint text-ink'
                  : 'border-ink/20 hover:border-mint hover:bg-mint/30'
              }`}
              aria-label={done ? 'Выполнено' : 'Отметить выполненным'}
            >
              {done && <CheckCircleIcon className="h-5 w-5" />}
            </button>

            <div className="min-w-0 flex-1 text-left">
              <h3 className={`font-bold text-ink ${done ? 'line-through opacity-60' : ''}`}>
                {task.title}
              </h3>
              {!compact && (
                <p className="mt-1 text-sm text-ink/60">{task.description}</p>
              )}
              <p className="mt-2 text-xs font-semibold text-coral">
                +{task.xpReward} XP · +{task.coinReward} 🪙
              </p>
            </div>
          </motion.li>
        );
      })}
    </ul>
  );
}
