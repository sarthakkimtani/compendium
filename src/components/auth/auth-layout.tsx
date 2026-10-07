import type { ReactNode } from "react";

export const AuthHeader = ({ title, children }: { title: string; children: ReactNode }) => (
  <>
    <h1 className="mb-2.5 font-serif text-[29px] leading-[1.2] text-ink-240">{title}</h1>
    <p className="mb-7.5 text-[14px] leading-[1.6] text-ink-500">{children}</p>
  </>
);

export const AuthFooter = ({ children }: { children: ReactNode }) => (
  <div className="mt-5.5 flex justify-between gap-4 border-t border-ink-910 pt-4.5 font-mono text-[11px] text-ink-500">
    {children}
  </div>
);
