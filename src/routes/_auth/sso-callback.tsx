import { AuthenticateWithRedirectCallback } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";

import { AuthHeader } from "@/components/auth/auth-ui";

export const Route = createFileRoute("/_auth/sso-callback")({
  head: () => ({ meta: [{ title: "Signing in - Compendium" }] }),
  component: SSOCallbackPage,
});

function SSOCallbackPage() {
  return (
    <>
      <AuthHeader title="Signing you in.">One moment while we finish up.</AuthHeader>
      <p className="flex items-center gap-2.5 font-mono text-[11px] text-ink-500">
        <LoaderCircle className="size-3.25 animate-spin" strokeWidth={1.2} absoluteStrokeWidth />
        checking your account
      </p>
      <AuthenticateWithRedirectCallback signInUrl="/sign-in" signUpUrl="/sign-up" />
    </>
  );
}
