import { ClerkProvider } from "@clerk/tanstack-react-start";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";

import { getAuthState } from "@/lib/auth";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
  beforeLoad: async () => {
    const { userId } = await getAuthState();
    return { userId };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Compendium" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider prefetchUI={false} signInUrl="/sign-in" signUpUrl="/sign-up">
      <html lang="en">
        <head>
          <HeadContent />
        </head>
        <body>
          {children}
          <TanStackDevtools
            config={{ position: "bottom-right" }}
            plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
          />
          <Scripts />
        </body>
      </html>
    </ClerkProvider>
  );
}
