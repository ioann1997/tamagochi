import {
  HomeIcon,
  ClipboardDocumentCheckIcon,
  BookOpenIcon,
  GiftIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeSolid,
  ClipboardDocumentCheckIcon as TasksSolid,
  BookOpenIcon as RulesSolid,
  GiftIcon as GiftSolid,
  ChartBarIcon as ChartSolid,
} from '@heroicons/react/24/solid';
import { motion } from 'framer-motion';
import { AuthPanel } from '../auth/AuthPanel';
import { AuthPanelMobile } from '../auth/AuthPanelMobile';
import { useGame } from '../../context/GameContext';
import type { TabId } from '../../types/game';

const TABS: { id: TabId; label: string; Icon: typeof HomeIcon; IconActive: typeof HomeSolid }[] = [
  { id: 'home', label: 'Тамагочи', Icon: HomeIcon, IconActive: HomeSolid },
  { id: 'tasks', label: 'Задания', Icon: ClipboardDocumentCheckIcon, IconActive: TasksSolid },
  { id: 'rules', label: 'Правила', Icon: BookOpenIcon, IconActive: RulesSolid },
  { id: 'rewards', label: 'Награды', Icon: GiftIcon, IconActive: GiftSolid },
  { id: 'levels', label: 'Уровни', Icon: ChartBarIcon, IconActive: ChartSolid },
];

export function Sidebar() {
  const { activeTab, setActiveTab, state } = useGame();

  return (
    <aside className="flex w-full flex-row gap-1 border-t border-lavender/40 bg-panel p-2 shadow-lg md:w-56 md:flex-col md:border-t-0 md:border-r md:p-4">
      <div className="mb-0 flex items-center justify-between gap-2 md:mb-6 md:block">
        <div className="hidden md:block">
          <h1 className="text-lg font-extrabold text-ink">Мой Тамагочи</h1>
          <p className="text-xs text-ink/60">Уровень {state.level}</p>
        </div>
        <AuthPanelMobile />
      </div>

      <nav className="flex flex-1 flex-row justify-around gap-1 md:flex-col md:justify-start">
        {TABS.map(({ id, label, Icon, IconActive }) => {
          const active = activeTab === id;
          const TabIcon = active ? IconActive : Icon;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-xs font-semibold transition-colors md:flex-row md:gap-3 md:px-4 md:py-3 md:text-sm ${
                active ? 'text-ink' : 'text-ink/50 hover:bg-cream hover:text-ink'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl bg-mint/50"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <TabIcon className="relative z-10 h-5 w-5 md:h-5 md:w-5" />
              <span className="relative z-10 hidden sm:inline md:inline">{label}</span>
            </button>
          );
        })}
      </nav>

      <div className="hidden items-center gap-2 rounded-xl bg-sun/30 px-3 py-2 md:flex">
        <span className="text-lg">🪙</span>
        <span className="font-bold text-ink">{state.coins}</span>
      </div>

      <AuthPanel />
    </aside>
  );
}
