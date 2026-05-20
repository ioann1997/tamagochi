import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './context/AuthContext';
import { GameProvider, useGame } from './context/GameContext';
import { Sidebar } from './components/layout/Sidebar';
import { Notifications } from './components/layout/Notifications';
import { HomePage } from './pages/HomePage';
import { TasksPage } from './pages/TasksPage';
import { RulesPage } from './pages/RulesPage';
import { RewardsPage } from './pages/RewardsPage';
import { LevelsPage } from './pages/LevelsPage';

function AppContent() {
  const { activeTab } = useGame();

  const pages = {
    home: HomePage,
    tasks: TasksPage,
    rules: RulesPage,
    rewards: RewardsPage,
    levels: LevelsPage,
  };

  const Page = pages[activeTab];

  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-cream">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <Page />
          </motion.div>
        </AnimatePresence>
      </main>
      <Notifications />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GameProvider>
        <AppContent />
      </GameProvider>
    </AuthProvider>
  );
}
