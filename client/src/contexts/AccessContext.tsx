import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { IS_VERCEL } from "@/lib/useApi";
import { accessApi } from "@/lib/api";
import { trpc } from "@/lib/trpc";

type AccessState = {
  isAuthenticated: boolean;
  email: string | null;
  loading: boolean;
  sessionToken: string | null;
  login: (email: string, sessionToken: string) => void;
  logout: () => void;
};

const AccessContext = createContext<AccessState | null>(null);

const SESSION_KEY = "units_sg_session";

/**
 * Manus AccessProvider - uses tRPC hooks for session checking.
 */
function ManusAccessProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(SESSION_KEY);
  });
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const checkSession = trpc.access.checkSession.useQuery(
    sessionToken ? { sessionToken } : undefined,
    { enabled: !!sessionToken, retry: false }
  );

  useEffect(() => {
    if (!sessionToken) {
      setLoading(false);
      return;
    }
    if (checkSession.isLoading) return;

    if (checkSession.data?.authenticated) {
      setEmail(checkSession.data.email);
    } else {
      localStorage.removeItem(SESSION_KEY);
      setSessionToken(null);
      setEmail(null);
    }
    setLoading(false);
  }, [sessionToken, checkSession.isLoading, checkSession.data]);

  const logoutMutation = trpc.access.logout.useMutation();

  const login = useCallback((newEmail: string, newToken: string) => {
    localStorage.setItem(SESSION_KEY, newToken);
    setSessionToken(newToken);
    setEmail(newEmail);
  }, []);

  const logout = useCallback(() => {
    logoutMutation.mutate();
    localStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setEmail(null);
  }, [logoutMutation]);

  return (
    <AccessContext.Provider
      value={{ isAuthenticated: !!email && !!sessionToken, email, loading, sessionToken, login, logout }}
    >
      {children}
    </AccessContext.Provider>
  );
}

/**
 * Vercel AccessProvider - uses fetch-based API client for session checking.
 */
function VercelAccessProvider({ children }: { children: ReactNode }) {
  const [sessionToken, setSessionToken] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(SESSION_KEY);
  });
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionToken) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    accessApi.checkSession({ sessionToken })
      .then((result) => {
        if (cancelled) return;
        if (result.authenticated && result.email) {
          setEmail(result.email);
        } else {
          localStorage.removeItem(SESSION_KEY);
          setSessionToken(null);
          setEmail(null);
        }
      })
      .catch(() => {
        if (cancelled) return;
        localStorage.removeItem(SESSION_KEY);
        setSessionToken(null);
        setEmail(null);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [sessionToken]);

  const login = useCallback((newEmail: string, newToken: string) => {
    localStorage.setItem(SESSION_KEY, newToken);
    setSessionToken(newToken);
    setEmail(newEmail);
  }, []);

  const logout = useCallback(() => {
    accessApi.logout().catch(() => {});
    localStorage.removeItem(SESSION_KEY);
    setSessionToken(null);
    setEmail(null);
  }, []);

  return (
    <AccessContext.Provider
      value={{ isAuthenticated: !!email && !!sessionToken, email, loading, sessionToken, login, logout }}
    >
      {children}
    </AccessContext.Provider>
  );
}

/**
 * Deployment-aware AccessProvider.
 * Delegates to ManusAccessProvider (tRPC) or VercelAccessProvider (fetch)
 * based on the VITE_DEPLOY_TARGET build-time variable.
 */
export function AccessProvider({ children }: { children: ReactNode }) {
  if (IS_VERCEL) {
    return <VercelAccessProvider>{children}</VercelAccessProvider>;
  }
  return <ManusAccessProvider>{children}</ManusAccessProvider>;
}

export function useAccess(): AccessState {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within an AccessProvider");
  return ctx;
}
