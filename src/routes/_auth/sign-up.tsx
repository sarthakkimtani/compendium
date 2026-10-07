import { createFileRoute } from "@tanstack/react-router";

import { AuthFooter, AuthHeader } from "@/components/auth/auth-layout";
import { AuthLink } from "@/components/auth/auth-controls";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export const Route = createFileRoute("/_auth/sign-up")({
  head: () => ({ meta: [{ title: "Create an account - Compendium" }] }),
  component: SignUpPage,
});

function SignUpPage() {
  return (
    <>
      <AuthHeader title="Start with one problem.">
        Collect the files, notes and links for it. Then ask about them.
      </AuthHeader>
      <OAuthButtons flow="signUp" />
      <AuthFooter>
        <span>no setup · no team invite</span>
        <AuthLink to="/sign-in">sign in instead</AuthLink>
      </AuthFooter>
    </>
  );
}
