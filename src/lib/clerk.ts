import { isClerkAPIResponseError } from "@clerk/tanstack-react-start/errors";
import type { SetActiveNavigate } from "@clerk/tanstack-react-start/types";
import { useNavigate } from "@tanstack/react-router";

export const AFTER_AUTH_PATH = "/";
export const SSO_CALLBACK_PATH = "/sso-callback";

export function errorText(error: { message: string; longMessage?: string } | null | undefined) {
  if (!error) return null;
  if (isClerkAPIResponseError(error)) {
    const [first] = error.errors;
    return first?.longMessage ?? first?.message ?? error.message;
  }
  return error.longMessage ?? error.message;
}

export function useFinishAuth(): SetActiveNavigate {
  const navigate = useNavigate();

  return async ({ decorateUrl }) => {
    const url = decorateUrl(AFTER_AUTH_PATH);
    if (url.startsWith("http")) {
      window.location.href = url;
      return;
    }
    await navigate({ to: url, replace: true });
  };
}
