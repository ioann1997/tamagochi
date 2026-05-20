import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightOnRectangleIcon,
  CloudIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';

type AuthMode = 'login' | 'register';

export function AuthPanel() {
  const { user, loading, firebaseReady, signIn, signUp, signInWithGoogle, logOut, authError, clearAuthError } =
    useAuth();
  const { syncStatus } = useGame();
  const [expanded, setExpanded] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!firebaseReady) {
    return (
      <div className="hidden rounded-xl border-2 border-coral/30 bg-coral/10 px-3 py-2 text-xs text-ink/70 md:block">
        Firebase не настроен. Добавьте ключи в <code className="font-mono">.env</code>
      </div>
    );
  }

  const syncLabel =
    syncStatus === 'loading'
      ? 'Загрузка…'
      : syncStatus === 'saving'
        ? 'Сохранение…'
        : syncStatus === 'synced'
          ? 'В облаке'
          : syncStatus === 'error'
            ? 'Ошибка синхр.'
            : null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearAuthError();
    try {
      if (mode === 'login') await signIn(email, password);
      else await signUp(email, password);
      setExpanded(false);
      setPassword('');
    } catch {
      /* error shown via authError */
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = async () => {
    setSubmitting(true);
    clearAuthError();
    try {
      await signInWithGoogle();
      setExpanded(false);
    } catch {
      /* ignore */
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="hidden animate-pulse rounded-xl bg-lavender/20 px-3 py-3 md:block">
        <p className="text-xs text-ink/50">Проверка входа…</p>
      </div>
    );
  }

  if (user) {
    return (
      <div className="hidden flex-col gap-2 md:flex">
        <div className="rounded-xl border-2 border-mint/50 bg-mint/20 px-3 py-3">
          <div className="flex items-center gap-2">
            <UserCircleIcon className="h-5 w-5 shrink-0 text-ink" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-ink">{user.email}</p>
              {syncLabel && (
                <p className="flex items-center gap-1 text-xs text-ink/60">
                  <CloudIcon className="h-3 w-3" />
                  {syncLabel}
                </p>
              )}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => logOut()}
          className="flex items-center justify-center gap-2 rounded-xl border-2 border-ink/10 px-3 py-2 text-xs font-semibold text-ink/70 hover:bg-cream"
        >
          <ArrowRightOnRectangleIcon className="h-4 w-4" />
          Выйти
        </button>
      </div>
    );
  }

  return (
    <div className="relative hidden md:block">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full rounded-xl border-2 border-sky/50 bg-sky/20 px-3 py-2 text-xs font-bold text-ink hover:bg-sky/30"
      >
        Войти / Регистрация
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-2xl border-2 border-lavender/50 bg-panel p-4 shadow-xl"
          >
            <div className="mb-3 flex gap-2">
              <button
                type="button"
                onClick={() => { setMode('login'); clearAuthError(); }}
                className={`flex-1 rounded-lg py-1 text-xs font-bold ${mode === 'login' ? 'bg-mint text-ink' : 'text-ink/50'}`}
              >
                Вход
              </button>
              <button
                type="button"
                onClick={() => { setMode('register'); clearAuthError(); }}
                className={`flex-1 rounded-lg py-1 text-xs font-bold ${mode === 'register' ? 'bg-mint text-ink' : 'text-ink/50'}`}
              >
                Регистрация
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg border-2 border-lavender/40 px-3 py-2 text-sm"
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Пароль (мин. 6)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-lg border-2 border-lavender/40 px-3 py-2 text-sm"
              />
              {authError && (
                <p className="text-xs font-semibold text-coral">{authError}</p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-coral py-2 text-sm font-bold text-white disabled:opacity-50"
              >
                {submitting ? '…' : mode === 'login' ? 'Войти' : 'Создать аккаунт'}
              </button>
            </form>

            <div className="my-3 flex items-center gap-2">
              <div className="h-px flex-1 bg-lavender/40" />
              <span className="text-xs text-ink/40">или</span>
              <div className="h-px flex-1 bg-lavender/40" />
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={handleGoogle}
              className="w-full rounded-lg border-2 border-ink/10 py-2 text-sm font-semibold hover:bg-cream disabled:opacity-50"
            >
              Google
            </button>

            <p className="mt-2 text-center text-xs text-ink/50">
              Прогресс синхронизируется в Firestore
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
