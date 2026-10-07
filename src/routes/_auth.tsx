import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AuthShell } from "@/components/auth/auth-shell";

type AuthSearch = {
  error?: "sso_incomplete";
};

export const Route = createFileRoute("/_auth")({
  validateSearch: (search): AuthSearch =>
    search.error === "sso_incomplete" ? { error: "sso_incomplete" } : {},
  beforeLoad: ({ context, location }) => {
    if (context.userId && location.pathname !== "/sso-callback") {
      throw redirect({ to: "/" });
    }
  },
  component: AuthLayout,
});

function AuthLayout() {
  return (
    <AuthShell>
      <Outlet />
    </AuthShell>
  );
}
