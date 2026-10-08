import { createFileRoute } from "@tanstack/react-router";

import { SignUp } from "@/components/pages/sign-up";

export const Route = createFileRoute("/_auth/sign-up")({
  head: () => ({ meta: [{ title: "Create an account - Compendium" }] }),
  component: SignUpPage,
});

function SignUpPage() {
  return <SignUp />;
}
