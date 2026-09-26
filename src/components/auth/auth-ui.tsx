import { createLink } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-[1.5px] focus-visible:outline-offset-2 focus-visible:outline-teal-ring";

export const AuthHeader = ({ title, children }: { title: string; children: ReactNode }) => {
  return (
    <>
      <h1 className="mb-2.5 font-serif text-[29px] leading-[1.2] text-ink-240">{title}</h1>
      <p className="mb-7.5 text-[14px] leading-[1.6] text-ink-500">{children}</p>
    </>
  );
};

type AuthButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "secondary";
  icon?: ReactNode;
  pending?: boolean;
};

export const AuthButton = ({
  variant = "primary",
  icon,
  pending = false,
  className,
  children,
  ...props
}: AuthButtonProps) => {
  return (
    <button
      aria-busy={pending || undefined}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-control text-[14.5px] font-medium transition-colors disabled:cursor-default",
        variant === "primary" && "h-11.5 bg-ink-240 text-ink-970 enabled:hover:bg-ink-280",
        variant === "secondary" &&
          "h-12 border border-ink-820 bg-ink-995 text-ink-280 enabled:hover:border-ink-800 enabled:hover:bg-ink-990",
        pending && "opacity-80",
        focusRing,
        className,
      )}
      {...props}
    >
      {pending ? (
        <LoaderCircle className="size-3.75 animate-spin" strokeWidth={1.4} absoluteStrokeWidth />
      ) : (
        icon
      )}
      {children}
    </button>
  );
};

export const AuthError = ({ children }: { children: ReactNode }) => {
  if (!children) return null;
  return (
    <p role="alert" className="mt-3.5 text-[12.5px] leading-normal text-oxblood-text">
      {children}
    </p>
  );
};

export const AuthFooter = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-5.5 flex justify-between gap-4 border-t border-ink-910 pt-4.5 font-mono text-[11px] text-ink-500">
      {children}
    </div>
  );
};

const AuthAnchor = ({ className, ...props }: ComponentProps<"a">) => {
  return (
    <a
      className={cn("text-teal transition-colors hover:text-oxblood", focusRing, className)}
      {...props}
    />
  );
};

export const AuthLink = createLink(AuthAnchor);
