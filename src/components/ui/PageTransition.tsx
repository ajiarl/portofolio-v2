import { ReactNode } from 'react';

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-1 h-full animate-fade-in-up">
      {children}
    </div>
  );
}
