/**
 * useAdminData - Deployment-aware admin data hook.
 *
 * On Manus: uses tRPC hooks (useQuery / useMutation).
 * On Vercel: uses React Query wrapping the fetch-based adminApi.
 *
 * Returns a unified interface so AdminDashboard does not need to know
 * which backend it is talking to.
 */

import { IS_VERCEL } from "@/lib/useApi";
import { trpc } from "@/lib/trpc";
import { adminApi } from "@/lib/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  AllowedEmail,
  AccessLogEntry,
  AccessSession,
  AdminStats,
  AddEmailInput,
  ToggleEmailInput,
  DeleteEmailInput,
  RevokeSessionInput,
  SuccessOutput,
} from "@shared/api";

/**
 * Common shape returned by both implementations.
 */
export interface AdminData {
  // Queries
  emailsQuery: {
    data: AllowedEmail[] | undefined;
    isLoading: boolean;
    refetch: () => void;
  };
  logsQuery: {
    data: AccessLogEntry[] | undefined;
    isLoading: boolean;
    refetch: () => void;
  };
  sessionsQuery: {
    data: AccessSession[] | undefined;
    isLoading: boolean;
    refetch: () => void;
  };
  statsQuery: {
    data: AdminStats | undefined;
    isLoading: boolean;
    refetch: () => void;
  };
  // Mutations
  addEmailMutation: {
    mutateAsync: (input: AddEmailInput) => Promise<SuccessOutput>;
    mutate: (input: AddEmailInput) => void;
    isPending: boolean;
  };
  toggleEmailMutation: {
    mutateAsync: (input: ToggleEmailInput) => Promise<SuccessOutput>;
    mutate: (input: ToggleEmailInput) => void;
    isPending: boolean;
  };
  deleteEmailMutation: {
    mutateAsync: (input: DeleteEmailInput) => Promise<SuccessOutput>;
    mutate: (input: DeleteEmailInput) => void;
    isPending: boolean;
  };
  revokeSessionMutation: {
    mutateAsync: (input: RevokeSessionInput) => Promise<SuccessOutput>;
    mutate: (input: RevokeSessionInput) => void;
    isPending: boolean;
  };
}

function useManusAdminData(): AdminData {
  const emailsQuery = trpc.admin.listEmails.useQuery();
  const logsQuery = trpc.admin.listLogs.useQuery({ limit: 100 });
  const sessionsQuery = trpc.admin.listSessions.useQuery();
  const statsQuery = trpc.admin.stats.useQuery();

  const addEmailMutation = trpc.admin.addEmail.useMutation({
    onSuccess: () => { emailsQuery.refetch(); statsQuery.refetch(); },
  });
  const toggleEmailMutation = trpc.admin.toggleEmail.useMutation({
    onSuccess: () => { emailsQuery.refetch(); statsQuery.refetch(); },
  });
  const deleteEmailMutation = trpc.admin.deleteEmail.useMutation({
    onSuccess: () => { emailsQuery.refetch(); statsQuery.refetch(); },
  });
  const revokeSessionMutation = trpc.admin.revokeSession.useMutation({
    onSuccess: () => { sessionsQuery.refetch(); statsQuery.refetch(); },
  });

  return {
    emailsQuery: { data: emailsQuery.data as AllowedEmail[] | undefined, isLoading: emailsQuery.isLoading, refetch: emailsQuery.refetch },
    logsQuery: { data: logsQuery.data as AccessLogEntry[] | undefined, isLoading: logsQuery.isLoading, refetch: logsQuery.refetch },
    sessionsQuery: { data: sessionsQuery.data as AccessSession[] | undefined, isLoading: sessionsQuery.isLoading, refetch: sessionsQuery.refetch },
    statsQuery: { data: statsQuery.data as AdminStats | undefined, isLoading: statsQuery.isLoading, refetch: statsQuery.refetch },
    addEmailMutation: { mutateAsync: addEmailMutation.mutateAsync as any, mutate: addEmailMutation.mutate as any, isPending: addEmailMutation.isPending },
    toggleEmailMutation: { mutateAsync: toggleEmailMutation.mutateAsync as any, mutate: toggleEmailMutation.mutate as any, isPending: toggleEmailMutation.isPending },
    deleteEmailMutation: { mutateAsync: deleteEmailMutation.mutateAsync as any, mutate: deleteEmailMutation.mutate as any, isPending: deleteEmailMutation.isPending },
    revokeSessionMutation: { mutateAsync: revokeSessionMutation.mutateAsync as any, mutate: revokeSessionMutation.mutate as any, isPending: revokeSessionMutation.isPending },
  };
}

function useVercelAdminData(): AdminData {
  const queryClient = useQueryClient();

  const emailsQuery = useQuery({ queryKey: ["admin", "emails"], queryFn: () => adminApi.listEmails() });
  const logsQuery = useQuery({ queryKey: ["admin", "logs"], queryFn: () => adminApi.listLogs(100) });
  const sessionsQuery = useQuery({ queryKey: ["admin", "sessions"], queryFn: () => adminApi.listSessions() });
  const statsQuery = useQuery({ queryKey: ["admin", "stats"], queryFn: () => adminApi.stats() });

  const invalidateEmailsAndStats = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "emails"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
  };

  const invalidateSessionsAndStats = () => {
    queryClient.invalidateQueries({ queryKey: ["admin", "sessions"] });
    queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
  };

  const addEmailMutation = useMutation({
    mutationFn: (input: AddEmailInput) => adminApi.addEmail(input),
    onSuccess: invalidateEmailsAndStats,
  });
  const toggleEmailMutation = useMutation({
    mutationFn: (input: ToggleEmailInput) => adminApi.toggleEmail(input),
    onSuccess: invalidateEmailsAndStats,
  });
  const deleteEmailMutation = useMutation({
    mutationFn: (input: DeleteEmailInput) => adminApi.deleteEmail(input),
    onSuccess: invalidateEmailsAndStats,
  });
  const revokeSessionMutation = useMutation({
    mutationFn: (input: RevokeSessionInput) => adminApi.revokeSession(input),
    onSuccess: invalidateSessionsAndStats,
  });

  return {
    emailsQuery: { data: emailsQuery.data, isLoading: emailsQuery.isLoading, refetch: emailsQuery.refetch },
    logsQuery: { data: logsQuery.data, isLoading: logsQuery.isLoading, refetch: logsQuery.refetch },
    sessionsQuery: { data: sessionsQuery.data, isLoading: sessionsQuery.isLoading, refetch: sessionsQuery.refetch },
    statsQuery: { data: statsQuery.data, isLoading: statsQuery.isLoading, refetch: statsQuery.refetch },
    addEmailMutation: { mutateAsync: addEmailMutation.mutateAsync, mutate: addEmailMutation.mutate, isPending: addEmailMutation.isPending },
    toggleEmailMutation: { mutateAsync: toggleEmailMutation.mutateAsync, mutate: toggleEmailMutation.mutate, isPending: toggleEmailMutation.isPending },
    deleteEmailMutation: { mutateAsync: deleteEmailMutation.mutateAsync, mutate: deleteEmailMutation.mutate, isPending: deleteEmailMutation.isPending },
    revokeSessionMutation: { mutateAsync: revokeSessionMutation.mutateAsync, mutate: revokeSessionMutation.mutate, isPending: revokeSessionMutation.isPending },
  };
}

/**
 * Deployment-aware hook. Calls tRPC on Manus, fetch on Vercel.
 * IS_VERCEL is a build-time constant, so the unused branch is tree-shaken.
 */
export function useAdminData(): AdminData {
  // IS_VERCEL is a compile-time constant from Vite's define.
  // The branch that is not taken will be dead-code-eliminated in production builds.
  if (IS_VERCEL) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return useVercelAdminData();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useManusAdminData();
}
