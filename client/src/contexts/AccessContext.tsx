import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
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

export function AccessProvider({ children }: { children: ReactNode }) {
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
      // Session invalid or expired
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
      value={{
        isAuthenticated: !!email && !!sessionToken,
        email,
        loading,
        sessionToken,
        login,
        logout,
      }}
    >
      {children}
    </AccessContext.Provider>
  );
}

export function useAccess(): AccessState {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccess must be used within an AccessProvider");
  return ctx;
}
