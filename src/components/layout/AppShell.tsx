import type { ReactNode } from 'react';
import { useGame } from '../../context/GameContext';
import { RoomBackground } from './RoomBackground';
import { GirlCharacter } from '../pet/GirlCharacter';
import { TopMenu } from './TopMenu';
import { BottomNav } from './BottomNav';
import { Notifications } from './Notifications';

export function AppShell({ children }: { children: ReactNode }) {
  const { state } = useGame();

  return (
    <div className="fixed inset-0 h-dvh w-full overflow-hidden">
      <RoomBackground />
      <div className="pointer-events-none fixed inset-0 z-[4] bg-gradient-to-b from-black/15 via-transparent to-black/35" />
      <GirlCharacter mood={state.mood} />

      <TopMenu />

      <main className="relative z-20 flex h-full flex-col pt-11 pb-[3.6rem]">
        <div className="min-h-0 flex-1" aria-hidden />
        <div className="shrink-0 px-2 pb-1">{children}</div>
      </main>

      <BottomNav />
      <Notifications />
    </div>
  );
}
