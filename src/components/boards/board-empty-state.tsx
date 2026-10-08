import compendiumMark from "@/assets/logos/compendium.svg";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";

export function BoardEmptyState({ onCreate }: { onCreate: () => void }) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center border border-dashed border-ink-820 bg-ink-995/60 px-6 text-center">
      <img src={compendiumMark} alt="" className="mb-5 size-8 opacity-70" />
      <h2 className="font-serif text-2xl">Start with a question.</h2>
      <p className="mt-2 max-w-sm text-sm leading-6 text-ink-500">
        Create a board for something you’re figuring out. You’ll land on its canvas, ready to
        collect.
      </p>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="link"
          onClick={onCreate}
          className="mt-6 h-auto cursor-pointer rounded-none border-b border-oxblood-line px-0 pb-1 font-mono text-[11px] font-normal text-oxblood-text no-underline hover:border-oxblood hover:text-oxblood-text hover:no-underline"
        >
          Create your first board <span aria-hidden>↗</span>
        </Button>
      </DialogTrigger>
    </div>
  );
}
