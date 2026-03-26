import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { IS_VERCEL } from "@/lib/useApi";

const queryClient = new QueryClient();

if (IS_VERCEL) {
  // ── Vercel deployment: plain React Query, no tRPC ──
  createRoot(document.getElementById("root")!).render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
} else {
  // ── Manus deployment: full tRPC + React Query ──
  // Dynamic imports keep tRPC out of the Vercel bundle entirely
  Promise.all([
    import("@/lib/trpc"),
    import("@trpc/client"),
    import("superjson"),
    import("@shared/const"),
    import("./const"),
  ]).then(([{ trpc }, { httpBatchLink, TRPCClientError }, { default: superjson }, { UNAUTHED_ERR_MSG }, { getLoginUrl }]) => {

    const redirectToLoginIfUnauthorized = (error: unknown) => {
      if (!(error instanceof TRPCClientError)) return;
      if (typeof window === "undefined") return;
      if (error.message === UNAUTHED_ERR_MSG) {
        window.location.href = getLoginUrl();
      }
    };

    queryClient.getQueryCache().subscribe(event => {
      if (event.type === "updated" && event.action.type === "error") {
        const error = event.query.state.error;
        redirectToLoginIfUnauthorized(error);
        console.error("[API Query Error]", error);
      }
    });

    queryClient.getMutationCache().subscribe(event => {
      if (event.type === "updated" && event.action.type === "error") {
        const error = event.mutation.state.error;
        redirectToLoginIfUnauthorized(error);
        console.error("[API Mutation Error]", error);
      }
    });

    const trpcClient = trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          fetch(input, init) {
            return globalThis.fetch(input, {
              ...(init ?? {}),
              credentials: "include",
            });
          },
        }),
      ],
    });

    createRoot(document.getElementById("root")!).render(
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </trpc.Provider>
    );
  });
}
