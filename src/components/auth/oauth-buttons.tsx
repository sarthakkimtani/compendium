import { useSignIn, useSignUp } from "@clerk/tanstack-react-start";
import type { OAuthStrategy } from "@clerk/tanstack-react-start/types";
import { useSearch } from "@tanstack/react-router";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import githubLogo from "@/assets/logos/github.svg";
import googleLogo from "@/assets/logos/google.svg";
import { AuthButton, AuthError } from "@/components/auth/auth-controls";

type OAuthProvider = {
  id: string;
  strategy: OAuthStrategy;
  label: string;
  logo: string;
  variant: "primary" | "secondary";
};

type OAuthState = {
  redirectingTo: string | null;
  error: string | null;
};

const PROVIDERS: OAuthProvider[] = [
  {
    id: "google",
    strategy: "oauth_google",
    label: "Continue with Google",
    logo: googleLogo,
    variant: "primary",
  },
  {
    id: "github",
    strategy: "oauth_github",
    label: "Continue with GitHub",
    logo: githubLogo,
    variant: "secondary",
  },
];

const initialState: OAuthState = { redirectingTo: null, error: null };

const SSO_INCOMPLETE =
  "We couldn't finish signing you in with that account. Try again, or use the other provider.";

export const OAuthButtons = ({ flow }: { flow: "signIn" | "signUp" }) => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const search = useSearch({ from: "/_auth" });

  const [state, startOAuth] = useActionState<OAuthState, FormData>(async (_state, formData) => {
    const provider = PROVIDERS.find(({ id }) => id === formData.get("provider"));
    if (!provider) return { redirectingTo: null, error: "Pick a provider to continue." };

    const params = {
      strategy: provider.strategy,
      redirectUrl: "/",
      redirectCallbackUrl: "/sso-callback",
    };
    const { error } = flow === "signIn" ? await signIn.sso(params) : await signUp.sso(params);

    return error
      ? { redirectingTo: null, error: error.message }
      : { redirectingTo: provider.id, error: null };
  }, initialState);

  const message =
    state.error ??
    (search.error === "sso_incomplete" && !state.redirectingTo ? SSO_INCOMPLETE : null);

  return (
    <form action={startOAuth}>
      <div className="flex flex-col gap-2.5">
        {PROVIDERS.map((provider) => (
          <ProviderButton
            key={provider.id}
            provider={provider}
            redirectingTo={state.redirectingTo}
          />
        ))}
      </div>
      <AuthError>{message}</AuthError>
      <div id="clerk-captcha" className="mt-3.5 empty:hidden" />
    </form>
  );
};

const ProviderButton = ({
  provider,
  redirectingTo,
}: {
  provider: OAuthProvider;
  redirectingTo: string | null;
}) => {
  const { pending, data } = useFormStatus();
  const isActive =
    redirectingTo === provider.id || (pending && data?.get("provider") === provider.id);

  return (
    <AuthButton
      type="submit"
      name="provider"
      value={provider.id}
      variant={provider.variant}
      pending={isActive}
      disabled={pending || redirectingTo !== null}
      icon={<img src={provider.logo} alt="" className="block size-4" />}
    >
      {provider.label}
    </AuthButton>
  );
};
