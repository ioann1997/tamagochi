import type { ReactNode } from 'react';

export function ContentPanel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/50 bg-white/88 p-2 shadow-lg backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}
