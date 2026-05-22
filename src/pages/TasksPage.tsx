import { useGame } from '../context/GameContext';
import { TaskList } from '../components/tasks/TaskList';
import { DAILY_TASKS } from '../data/tasks';
import { ContentPanel } from '../components/layout/ContentPanel';

export function TasksPage() {
  const { state } = useGame();
  const done = state.completedTaskIds.length;

  return (
    <ContentPanel className="max-h-[32vh]">
      <div className="mb-1.5 flex items-center justify-between">
        <h2 className="text-xs font-extrabold text-ink">Задания</h2>
        <span className="rounded-full bg-mint/60 px-2 py-0.5 text-[10px] font-bold">
          {done}/{DAILY_TASKS.length}
        </span>
      </div>
      <TaskList mini />
    </ContentPanel>
  );
}
