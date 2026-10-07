import { auth, clerkClient } from "@clerk/tanstack-react-start/server";
import { createServerFn } from "@tanstack/react-start";

export const getAuthState = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await auth();
  return { userId };
});

export const getViewer = createServerFn({ method: "GET" }).handler(async () => {
  const { userId } = await auth();
  if (!userId) return null;

  const user = await clerkClient().users.getUser(userId);
  return {
    email: user.primaryEmailAddress?.emailAddress ?? null,
    imageUrl: user.imageUrl,
  };
});
