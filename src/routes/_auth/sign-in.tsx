import { createFileRoute } from "@tanstack/react-router";

import { SignIn } from "@/components/pages/sign-in";

export const Route = createFileRoute("/_auth/sign-in")({
  head: () => ({ meta: [{ title: "Sign in · Compendium" }] }),
  component: SignInPage,
});

function SignInPage() {
  return <SignIn />;
}
