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
import { useGame } from '../../context/GameContext';
import type { TabId } from '../../types/game';

const TABS: {
  id: TabId;
  label: string;
  Icon: typeof HomeIcon;
  IconActive: typeof HomeSolid;
}[] = [
  { id: 'home', label: 'Дом', Icon: HomeIcon, IconActive: HomeSolid },
  { id: 'tasks', label: 'Задания', Icon: ClipboardDocumentCheckIcon, IconActive: TasksSolid },
  { id: 'rules', label: 'Правила', Icon: BookOpenIcon, IconActive: RulesSolid },
  { id: 'rewards', label: 'Награды', Icon: GiftIcon, IconActive: GiftSolid },
  { id: 'levels', label: 'Уровни', Icon: ChartBarIcon, IconActive: ChartSolid },
];

export function BottomNav() {
  const { activeTab, setActiveTab } = useGame();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-white/40 bg-white/92 px-1 pb-[max(0.25rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur-lg">
      <div className="mx-auto flex max-w-lg items-stretch justify-around">
        {TABS.map(({ id, label, Icon, IconActive }) => {
          const active = activeTab === id;
          const TabIcon = active ? IconActive : Icon;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex min-w-0 flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 transition-colors ${
                active ? 'text-coral' : 'text-ink/45'
              }`}
            >
              <TabIcon className="h-5 w-5 shrink-0" />
              <span className="w-full truncate text-center text-[9px] font-bold leading-none">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
