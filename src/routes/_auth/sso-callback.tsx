import { HandleSSOCallback } from "@clerk/tanstack-react-start";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LoaderCircle } from "lucide-react";

import { AuthHeader } from "@/components/auth/auth-ui";
import { useFinishAuth } from "@/lib/clerk";

export const Route = createFileRoute("/_auth/sso-callback")({
  head: () => ({ meta: [{ title: "Signing in - Compendium" }] }),
  component: SSOCallbackPage,
});

function SSOCallbackPage() {
  const navigate = useNavigate();
  const finishAuth = useFinishAuth();

  return (
    <>
      <AuthHeader title="Signing you in.">One moment while we finish up.</AuthHeader>
      <p className="flex items-center gap-2.5 font-mono text-[11px] text-ink-500">
        <LoaderCircle className="size-3.25 animate-spin" strokeWidth={1.2} absoluteStrokeWidth />
        checking your account
      </p>
      <HandleSSOCallback
        navigateToApp={finishAuth}
        navigateToSignIn={() =>
          navigate({ to: "/sign-in", search: { error: "sso_incomplete" }, replace: true })
        }
        navigateToSignUp={() =>
          navigate({ to: "/sign-up", search: { error: "sso_incomplete" }, replace: true })
        }
      />
    </>
  );
}
