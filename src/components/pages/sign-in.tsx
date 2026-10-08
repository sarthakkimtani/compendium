import { AuthLink } from "@/components/auth/auth-controls";
import { AuthFooter, AuthHeader } from "@/components/auth/auth-layout";
import { OAuthButtons } from "@/components/auth/oauth-buttons";

export const SignIn = () => {
  return (
    <>
      <AuthHeader title="Somewhere to put it all.">
        Collect the files, notes and links for one problem. Then ask about them.
      </AuthHeader>
      <OAuthButtons flow="signIn" />
      <AuthFooter>
        <span>no setup · no team invite</span>
        <AuthLink to="/sign-up">create an account</AuthLink>
      </AuthFooter>
    </>
  );
};
