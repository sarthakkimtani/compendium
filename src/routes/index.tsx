import { useClerk } from "@clerk/tanstack-react-start";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useTransition } from "react";

import compendiumMark from "@/assets/logos/compendium.svg";
import { getViewer } from "@/lib/auth";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (!context.userId) throw redirect({ to: "/sign-in" });
  },
  loader: () => getViewer(),
  component: Home,
});

function Home() {
  const viewer = Route.useLoaderData();
  const { signOut } = useClerk();
  const [signingOut, startSignOut] = useTransition();

  return (
    <div className="relative min-h-dvh bg-ink-951">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(var(--color-ink-800)_1px,transparent_1px)] bg-size-[26px_26px] opacity-50"
      />
      <header className="relative flex h-13 items-center gap-4 border-b border-ink-890 bg-ink-970 px-5">
        <img src={compendiumMark} alt="Compendium" className="block size-4" />
        <span className="truncate font-mono text-[11.5px] text-ink-550">{viewer?.email}</span>
        <div className="flex-1" />
        <button
          type="button"
          onClick={() => startSignOut(() => signOut({ redirectUrl: "/sign-in" }))}
          disabled={signingOut}
          className="inline-flex cursor-pointer items-center gap-1.5 font-mono text-[11px] text-ink-550 transition-colors hover:text-ink-280 focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-teal-ring disabled:cursor-default"
        >
          <LogOut className="size-3" strokeWidth={1.2} absoluteStrokeWidth />
          {signingOut ? "signing out…" : "sign out"}
        </button>
        {viewer?.imageUrl && (
          <img src={viewer.imageUrl} alt="" className="size-6.5 rounded-full bg-ink-870" />
        )}
      </header>
    </div>
  );
}
