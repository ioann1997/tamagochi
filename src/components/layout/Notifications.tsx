import { AnimatePresence, motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useGame } from '../../context/GameContext';

const TYPE_STYLES = {
  success: 'bg-mint border-mint text-ink',
  levelup: 'bg-sun border-sun text-ink',
  reward: 'bg-lavender border-lavender text-ink',
};

export function Notifications() {
  const { notifications, dismissNotification } = useGame();

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.9 }}
            className={`pointer-events-auto flex max-w-xs items-center gap-2 rounded-2xl border-2 px-4 py-3 shadow-lg ${TYPE_STYLES[n.type]}`}
          >
            <p className="flex-1 text-sm font-semibold">{n.message}</p>
            <button
              type="button"
              onClick={() => dismissNotification(n.id)}
              className="rounded-full p-1 hover:bg-black/10"
              aria-label="Закрыть"
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
