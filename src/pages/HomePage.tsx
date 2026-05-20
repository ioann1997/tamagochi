import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { LOCATIONS } from '../data/levels';
import { xpProgress } from '../data/levels';
import { PetAvatar } from '../components/pet/PetAvatar';
import { StatBar } from '../components/pet/StatBar';
import { InteractionButtons } from '../components/pet/InteractionButtons';
import { TaskList } from '../components/tasks/TaskList';
import { DAILY_TASKS } from '../data/tasks';

export function HomePage() {
  const { state, setPetName } = useGame();
  const [editingName, setEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(state.petName);

  const location =
    [...LOCATIONS].reverse().find((l) => state.level >= l.unlockLevel) ??
    LOCATIONS[0];

  const tasksDone = state.completedTaskIds.length;
  const progress = xpProgress(state.xp, state.level);

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <section className="flex flex-col items-center rounded-3xl border-2 border-lavender/40 bg-panel p-6 shadow-md">
          <PetAvatar
            mood={state.mood}
            petName={state.petName}
            level={state.level}
            locationEmoji={location.emoji}
          />

          {editingName ? (
            <form
              className="mt-2 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                setPetName(nameInput);
                setEditingName(false);
              }}
            >
              <input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="rounded-lg border-2 border-lavender px-3 py-1 text-sm font-semibold"
                maxLength={20}
              />
              <button type="submit" className="rounded-lg bg-mint px-3 py-1 text-sm font-bold">
                OK
              </button>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => {
                setNameInput(state.petName);
                setEditingName(true);
              }}
              className="mt-1 text-xs text-ink/50 underline"
            >
              Изменить имя
            </button>
          )}

          <p className="mt-2 text-sm font-medium text-ink/60">
            📍 {location.name}
          </p>

          <div className="mt-6 w-full max-w-xs space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs font-bold text-ink">
                <span>Опыт</span>
                <span>
                  {state.xp} / {state.level * 100} XP
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-ink/10">
                <motion.div
                  className="h-full rounded-full bg-sky"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
            <StatBar label="Сытость" value={state.hunger} color="bg-sun" icon="🍽️" />
            <StatBar label="Счастье" value={state.happiness} color="bg-coral" icon="💕" />
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-ink">Взаимодействие</h2>
            <p className="text-sm text-ink/60">Погладь, покорми или поиграй с питомцем</p>
          </div>
          <InteractionButtons />

          <div className="mt-4">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-ink">Задания на сегодня</h2>
              <span className="rounded-full bg-mint/50 px-3 py-1 text-sm font-bold">
                {tasksDone}/{DAILY_TASKS.length}
              </span>
            </div>
            <TaskList compact />
          </div>
        </section>
      </div>
    </div>
  );
}
