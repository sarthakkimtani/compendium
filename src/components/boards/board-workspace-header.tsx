import { useClerk } from "@clerk/tanstack-react-start";
import { LogOut } from "lucide-react";

import compendiumMark from "@/assets/logos/compendium.svg";
import { Button } from "@/components/ui/button";
import type { Viewer } from "@/lib/auth";

export function BoardWorkspaceHeader({ viewer }: { viewer: Viewer | null }) {
  const { signOut } = useClerk();

  return (
    <header className="relative flex h-13 items-center gap-3 border-b border-ink-890 bg-ink-970 px-5">
      <img src={compendiumMark} alt="" className="size-4" />
      <span className="font-serif text-[16px]">Compendium</span>
      <span className="ml-2 font-mono text-[10px] tracking-[0.12em] text-ink-500 uppercase">
        your workspace
      </span>
      <div className="flex-1" />
      <span className="hidden font-mono text-[11px] text-ink-500 sm:block">{viewer?.email}</span>
      <Button
        type="button"
        variant="ghost"
        onClick={() => signOut({ redirectUrl: "/sign-in" })}
        className="h-auto cursor-pointer gap-1.5 px-0 py-0 font-mono text-[11px] text-ink-550 hover:bg-transparent hover:text-ink-280"
      >
        <LogOut className="size-3" strokeWidth={1.2} /> sign out
      </Button>
      {viewer?.imageUrl && (
        <img src={viewer.imageUrl} alt="" className="size-6 rounded-full bg-ink-870" />
      )}
    </header>
  );
}
