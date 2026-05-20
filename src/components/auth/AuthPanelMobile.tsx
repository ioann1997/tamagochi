import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';

export function AuthPanelMobile() {
  const { user, firebaseReady, signIn, signUp, logOut, authError, clearAuthError } = useAuth();
  const { syncStatus } = useGame();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

  if (!firebaseReady) return null;

  if (user) {
    return (
      <button
        type="button"
        onClick={() => logOut()}
        className="rounded-lg px-2 py-1 text-xs font-semibold text-ink/60"
      >
        Выйти
      </button>
    );
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg bg-sky/40 px-2 py-1 text-xs font-bold text-ink md:hidden"
      >
        Войти
      </button>
    );
  }

  return (
    <form
      className="flex flex-col gap-1 md:hidden"
      onSubmit={async (e) => {
        e.preventDefault();
        clearAuthError();
        try {
          if (register) await signUp(email, password);
          else await signIn(email, password);
          setOpen(false);
        } catch {
          /* shown in authError */
        }
      }}
    >
      <input
        type="email"
        required
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-24 rounded border px-1 text-xs"
      />
      <input
        type="password"
        required
        minLength={6}
        placeholder="Пароль"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-24 rounded border px-1 text-xs"
      />
      {authError && <span className="text-xs text-coral">{authError}</span>}
      <div className="flex gap-1">
        <button type="submit" className="text-xs font-bold text-coral">
          {register ? 'Рег.' : 'OK'}
        </button>
        <button
          type="button"
          className="text-xs text-ink/50"
          onClick={() => setRegister((r) => !r)}
        >
          {register ? 'Вход' : 'Рег.'}
        </button>
        <button type="button" className="text-xs text-ink/50" onClick={() => setOpen(false)}>
          ✕
        </button>
      </div>
      {syncStatus === 'synced' && null}
    </form>
  );
}
