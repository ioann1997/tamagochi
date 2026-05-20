import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { GameState } from '../types/game';
import { db, isFirebaseConfigured } from '../lib/firebase';
import { DEFAULT_STATE } from '../constants/gameDefaults';

const GAME_DOC_PATH = (uid: string) => `users/${uid}/saves/default`;

export type SyncStatus = 'idle' | 'loading' | 'synced' | 'saving' | 'error';

export async function fetchGameState(uid: string): Promise<GameState | null> {
  if (!isFirebaseConfigured || !db) return null;

  const snap = await getDoc(doc(db, GAME_DOC_PATH(uid)));
  if (!snap.exists()) return null;

  const data = snap.data();
  const { updatedAt: _updatedAt, ...gameState } = data;
  return { ...DEFAULT_STATE, ...(gameState as Partial<GameState>) };
}

export async function saveGameState(uid: string, state: GameState): Promise<void> {
  if (!isFirebaseConfigured || !db) return;

  await setDoc(
    doc(db, GAME_DOC_PATH(uid)),
    {
      ...state,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  );
}
