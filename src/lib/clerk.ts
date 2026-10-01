import { isClerkAPIResponseError } from "@clerk/tanstack-react-start/errors";

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
