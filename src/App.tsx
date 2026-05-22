import { AuthProvider } from './context/AuthContext';
import { GameProvider, useGame } from './context/GameContext';
import { AppShell } from './components/layout/AppShell';
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
    <AppShell>
      <Page />
    </AppShell>
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
