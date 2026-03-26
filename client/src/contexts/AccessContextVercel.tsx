/**
 * AccessProvider for Vercel Deployment
 *
 * Same interface as the Manus AccessProvider, but uses the fetch-based
 * API client instead of tRPC hooks. Components consuming useAccess()
 * work identically regardless of which provider wraps them.
 */

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import { accessApi } from "@/lib/api";

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

export function AccessProviderVercel({ children }: { children: ReactNode }) {
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

export function useAccessVercel(): AccessState {
  const ctx = useContext(AccessContext);
  if (!ctx) throw new Error("useAccessVercel must be used within an AccessProviderVercel");
  return ctx;
}
