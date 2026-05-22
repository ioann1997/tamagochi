import { useState } from 'react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { MOOD_LABEL } from '../../utils/gameLogic';
import { ContentPanel } from './ContentPanel';

export function TopMenu() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { user, firebaseReady, signIn, signUp, signInWithGoogle, logOut, authError, clearAuthError } =
    useAuth();
  const { state, setPetName, syncStatus, resetProgress } = useGame();
  const [nameInput, setNameInput] = useState(state.petName);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    clearAuthError();
    try {
      if (mode === 'login') await signIn(email, password);
      else await signUp(email, password);
      setOpen(false);
    } catch {
      /* authError */
    }
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 flex items-center justify-between px-2 pb-1 pt-[max(0.35rem,env(safe-area-inset-top))]">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/60 bg-white/85 shadow-md backdrop-blur-md"
          aria-label="Меню"
        >
          <Bars3Icon className="h-5 w-5 text-ink" />
        </button>

        <div className="flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/85 px-2 py-1 text-[10px] font-bold shadow-md backdrop-blur-md">
          <span>🪙 {state.coins}</span>
          <span className="text-ink/30">|</span>
          <span>Ур.{state.level}</span>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Закрыть"
            onClick={() => setOpen(false)}
          />
          <aside className="relative flex h-full w-[min(88vw,300px)] flex-col overflow-y-auto bg-panel p-3 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-extrabold text-ink">Меню</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Закрыть">
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <ContentPanel className="mb-2 space-y-2">
              <p className="text-xs font-bold text-ink">{state.petName}</p>
              <p className="text-[10px] text-ink/60">{MOOD_LABEL[state.mood]}</p>
              <form
                className="flex gap-1"
                onSubmit={(e) => {
                  e.preventDefault();
                  setPetName(nameInput);
                }}
              >
                <input
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  className="min-w-0 flex-1 rounded border border-lavender/50 px-2 py-1 text-xs"
                  maxLength={20}
                />
                <button type="submit" className="rounded bg-mint px-2 text-xs font-bold">
                  OK
                </button>
              </form>
            </ContentPanel>

            {firebaseReady && (
              <ContentPanel className="mb-2">
                {user ? (
                  <div className="space-y-2">
                    <p className="truncate text-[10px] text-ink/70">{user.email}</p>
                    <p className="text-[10px] text-ink/50">
                      {syncStatus === 'synced' ? '☁️ В облаке' : syncStatus}
                    </p>
                    <button
                      type="button"
                      onClick={() => logOut()}
                      className="w-full rounded-lg bg-ink/10 py-1.5 text-xs font-bold"
                    >
                      Выйти
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleAuth} className="space-y-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setMode('login')}
                        className={`flex-1 rounded py-1 text-[10px] font-bold ${mode === 'login' ? 'bg-mint' : ''}`}
                      >
                        Вход
                      </button>
                      <button
                        type="button"
                        onClick={() => setMode('register')}
                        className={`flex-1 rounded py-1 text-[10px] font-bold ${mode === 'register' ? 'bg-mint' : ''}`}
                      >
                        Рег.
                      </button>
                    </div>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded border px-2 py-1 text-xs"
                    />
                    <input
                      type="password"
                      required
                      minLength={6}
                      placeholder="Пароль"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded border px-2 py-1 text-xs"
                    />
                    {authError && <p className="text-[10px] text-coral">{authError}</p>}
                    <button type="submit" className="w-full rounded-lg bg-coral py-1.5 text-xs font-bold text-white">
                      {mode === 'login' ? 'Войти' : 'Создать'}
                    </button>
                    <button
                      type="button"
                      onClick={() => signInWithGoogle()}
                      className="w-full rounded-lg border py-1.5 text-xs font-bold"
                    >
                      Google
                    </button>
                  </form>
                )}
              </ContentPanel>
            )}

            <button
              type="button"
              onClick={() => {
                if (window.confirm('Сбросить прогресс?')) {
                  resetProgress();
                  setOpen(false);
                }
              }}
              className="mt-auto text-center text-[10px] font-semibold text-coral"
            >
              Сбросить прогресс
            </button>
          </aside>
        </div>
      )}
    </>
  );
}
