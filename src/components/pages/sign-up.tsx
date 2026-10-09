import { AuthLink } from "@/components/auth/auth-controls";
import { AuthFooter, AuthHeader } from "@/components/auth/auth-layout";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export const SignUp = () => {
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
};
