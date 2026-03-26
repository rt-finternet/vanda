import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useAccess } from "@/contexts/AccessContext";
import { trpc } from "@/lib/trpc";
import {
  Users, Shield, Activity, Plus, Trash2, ToggleLeft, ToggleRight,
  ArrowLeft, RefreshCw, Search, Download, Eye, EyeOff, Clock,
  Mail, Building2, Key, ChevronDown, ChevronUp, LogOut
} from "lucide-react";

/* ── Brand Constants ── */
const C = {
  dark: "#0A1628",
  card: "#0F1D35",
  surface: "#162544",
  border: "#1E3A5F",
  teal: "#00A3A1",
  amber: "#F59E0B",
  purple: "#A78BFA",
  cyan: "#06B6D4",
  red: "#EE2536",
};

const SG_LOGO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663328851912/82pWKmUqBRkgn8Ladat8sj/units-sg-orchid-logo-light-KqELedrzeYmCnakJE4pQSh.png";

/* ── Tab type ── */
type Tab = "emails" | "logs" | "sessions";

export default function AdminDashboard() {
  const { email: currentEmail, logout } = useAccess();
  const [activeTab, setActiveTab] = useState<Tab>("emails");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch data
  const emailsQuery = trpc.admin.listEmails.useQuery();
  const logsQuery = trpc.admin.listLogs.useQuery({ limit: 100 });
  const sessionsQuery = trpc.admin.listSessions.useQuery();
  const statsQuery = trpc.admin.stats.useQuery();

  // Mutations
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

  // Add email form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [newOrg, setNewOrg] = useState("");
  const [newPin, setNewPin] = useState("");
  const [addError, setAddError] = useState("");

  const handleAddEmail = async () => {
    setAddError("");
    if (!newEmail.trim()) { setAddError("Email is required"); return; }
    try {
      await addEmailMutation.mutateAsync({
        email: newEmail.trim().toLowerCase(),
        name: newName.trim() || undefined,
        organization: newOrg.trim() || undefined,
        defaultPin: newPin.trim() || undefined,
      });
      setNewEmail(""); setNewName(""); setNewOrg(""); setNewPin("");
      setShowAddForm(false);
    } catch (err: any) {
      setAddError(err.message || "Failed to add email");
    }
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "emails", label: "Allowed Emails", icon: <Users className="w-4 h-4" />, count: statsQuery.data?.totalEmails },
    { id: "logs", label: "Access Log", icon: <Activity className="w-4 h-4" />, count: statsQuery.data?.totalLogs },
    { id: "sessions", label: "Active Sessions", icon: <Shield className="w-4 h-4" />, count: statsQuery.data?.activeSessions },
  ];

  const filteredEmails = emailsQuery.data?.filter(e =>
    e.email.includes(searchQuery.toLowerCase()) ||
    (e.name && e.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (e.organization && e.organization.toLowerCase().includes(searchQuery.toLowerCase()))
  ) || [];

  const filteredLogs = logsQuery.data?.filter(l =>
    l.email.includes(searchQuery.toLowerCase()) ||
    l.action.includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen text-white" style={{ background: C.dark }}>
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between"
        style={{ background: `${C.dark}F0`, backdropFilter: "blur(20px)", borderBottom: `1px solid ${C.border}40` }}>
        <div className="flex items-center gap-4">
          <Link href="/sg" className="flex items-center gap-2 text-xs tracking-widest uppercase opacity-50 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            Portal
          </Link>
          <div className="h-5 w-px" style={{ background: C.border }} />
          <div className="flex items-center gap-3">
            <img src={SG_LOGO} alt="VANDA" className="h-6 w-auto opacity-60" />
            <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: C.amber }}>Admin</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{currentEmail}</span>
          <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs hover:opacity-80 transition-opacity"
            style={{ background: `${C.red}15`, color: C.red, border: `1px solid ${C.red}20` }}>
            <LogOut className="w-3 h-3" /> Sign Out
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Allowed Emails", value: statsQuery.data?.totalEmails ?? "—", color: C.teal, icon: <Users className="w-5 h-5" /> },
            { label: "Active Emails", value: statsQuery.data?.activeEmails ?? "—", color: C.cyan, icon: <Mail className="w-5 h-5" /> },
            { label: "Active Sessions", value: statsQuery.data?.activeSessions ?? "—", color: C.amber, icon: <Shield className="w-5 h-5" /> },
            { label: "Total Access Events", value: statsQuery.data?.totalLogs ?? "—", color: C.purple, icon: <Activity className="w-5 h-5" /> },
          ].map((stat, i) => (
            <div key={i} className="rounded-xl p-5" style={{ background: C.card, border: `1px solid ${stat.color}15` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${stat.color}12` }}>
                  <div style={{ color: stat.color }}>{stat.icon}</div>
                </div>
                <span className="text-2xl font-bold" style={{ color: stat.color }}>{stat.value}</span>
              </div>
              <span className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>{stat.label}</span>
            </div>
          ))}
        </div>

        {/* ── Tabs ── */}
        <div className="flex items-center gap-1 mb-6 p-1 rounded-xl" style={{ background: C.card, border: `1px solid ${C.border}40` }}>
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-medium tracking-wide transition-all flex-1 justify-center"
              style={{
                background: activeTab === tab.id ? C.surface : "transparent",
                color: activeTab === tab.id ? "white" : "rgba(255,255,255,0.4)",
                border: activeTab === tab.id ? `1px solid ${C.border}` : "1px solid transparent",
              }}>
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.count !== undefined && (
                <span className="px-1.5 py-0.5 rounded-md text-[10px]"
                  style={{ background: activeTab === tab.id ? `${C.teal}20` : `${C.border}40`, color: activeTab === tab.id ? C.teal : "rgba(255,255,255,0.3)" }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Search + Actions Bar ── */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: "rgba(255,255,255,0.3)" }} />
            <input
              type="text"
              placeholder="Search emails, names, actions..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg text-sm outline-none"
              style={{ background: C.card, border: `1px solid ${C.border}40`, color: "white" }}
            />
          </div>
          {activeTab === "emails" && (
            <button onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide"
              style={{ background: `${C.teal}15`, color: C.teal, border: `1px solid ${C.teal}30` }}>
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Email</span>
            </button>
          )}
          <button onClick={() => { emailsQuery.refetch(); logsQuery.refetch(); sessionsQuery.refetch(); statsQuery.refetch(); }}
            className="p-2.5 rounded-lg" style={{ background: C.card, border: `1px solid ${C.border}40`, color: "rgba(255,255,255,0.4)" }}>
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        {/* ── Add Email Form ── */}
        {showAddForm && activeTab === "emails" && (
          <div className="rounded-xl p-6 mb-6" style={{ background: C.card, border: `1px solid ${C.teal}20` }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: C.teal }}>Add Stakeholder Email</h3>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Email *</label>
                <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)}
                  placeholder="stakeholder@example.com"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: C.surface, border: `1px solid ${C.border}`, color: "white" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Name</label>
                <input type="text" value={newName} onChange={e => setNewName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: C.surface, border: `1px solid ${C.border}`, color: "white" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Organization</label>
                <input type="text" value={newOrg} onChange={e => setNewOrg(e.target.value)}
                  placeholder="MAS / DBS / SGX"
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none"
                  style={{ background: C.surface, border: `1px solid ${C.border}`, color: "white" }} />
              </div>
              <div>
                <label className="text-xs mb-1 block" style={{ color: "rgba(255,255,255,0.4)" }}>Static PIN (optional — leave blank for email OTP)</label>
                <input type="text" value={newPin} onChange={e => setNewPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="6-digit PIN"
                  maxLength={6}
                  className="w-full px-3 py-2 rounded-lg text-sm outline-none font-mono"
                  style={{ background: C.surface, border: `1px solid ${C.border}`, color: "white" }} />
              </div>
            </div>
            {addError && <p className="text-xs mb-3" style={{ color: C.red }}>{addError}</p>}
            <div className="flex items-center gap-3">
              <button onClick={handleAddEmail} disabled={addEmailMutation.isPending}
                className="px-4 py-2 rounded-lg text-xs font-semibold"
                style={{ background: C.teal, color: C.dark }}>
                {addEmailMutation.isPending ? "Adding..." : "Add Email"}
              </button>
              <button onClick={() => setShowAddForm(false)}
                className="px-4 py-2 rounded-lg text-xs"
                style={{ color: "rgba(255,255,255,0.4)" }}>
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* ── EMAILS TAB ── */}
        {activeTab === "emails" && (
          <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}40` }}>
            {/* Table header */}
            <div className="grid grid-cols-12 gap-2 px-5 py-3 text-xs tracking-wider uppercase"
              style={{ background: C.surface, color: "rgba(255,255,255,0.35)", borderBottom: `1px solid ${C.border}40` }}>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Name</div>
              <div className="col-span-2">Organization</div>
              <div className="col-span-1 text-center">PIN Type</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-1 text-center">Accesses</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {emailsQuery.isLoading ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Loading...</div>
            ) : filteredEmails.length === 0 ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No emails found</div>
            ) : (
              filteredEmails.map((entry, i) => (
                <div key={entry.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-sm hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: i < filteredEmails.length - 1 ? `1px solid ${C.border}20` : "none" }}>
                  <div className="col-span-3 truncate font-mono text-xs" style={{ color: "rgba(255,255,255,0.7)" }}>{entry.email}</div>
                  <div className="col-span-2 truncate text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{entry.name || "—"}</div>
                  <div className="col-span-2 truncate text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{entry.organization || "—"}</div>
                  <div className="col-span-1 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        background: entry.defaultPin ? `${C.amber}15` : `${C.cyan}15`,
                        color: entry.defaultPin ? C.amber : C.cyan,
                      }}>
                      {entry.defaultPin ? "Static" : "Email OTP"}
                    </span>
                  </div>
                  <div className="col-span-1 text-center">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        background: entry.isActive ? `${C.teal}15` : `${C.red}15`,
                        color: entry.isActive ? C.teal : C.red,
                      }}>
                      {entry.isActive ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <div className="col-span-1 text-center text-xs font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {entry.accessCount}
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <button onClick={() => toggleEmailMutation.mutate({ id: entry.id, isActive: !entry.isActive })}
                      className="p-1.5 rounded-lg hover:opacity-80 transition-opacity"
                      title={entry.isActive ? "Disable" : "Enable"}
                      style={{ background: entry.isActive ? `${C.amber}10` : `${C.teal}10` }}>
                      {entry.isActive
                        ? <ToggleRight className="w-4 h-4" style={{ color: C.amber }} />
                        : <ToggleLeft className="w-4 h-4" style={{ color: C.teal }} />}
                    </button>
                    <button onClick={() => { if (confirm(`Delete ${entry.email}?`)) deleteEmailMutation.mutate({ id: entry.id }); }}
                      className="p-1.5 rounded-lg hover:opacity-80 transition-opacity"
                      title="Delete"
                      style={{ background: `${C.red}10` }}>
                      <Trash2 className="w-4 h-4" style={{ color: C.red }} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── LOGS TAB ── */}
        {activeTab === "logs" && (
          <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}40` }}>
            <div className="grid grid-cols-12 gap-2 px-5 py-3 text-xs tracking-wider uppercase"
              style={{ background: C.surface, color: "rgba(255,255,255,0.35)", borderBottom: `1px solid ${C.border}40` }}>
              <div className="col-span-3">Timestamp</div>
              <div className="col-span-3">Email</div>
              <div className="col-span-2">Action</div>
              <div className="col-span-2">IP Address</div>
              <div className="col-span-2">User Agent</div>
            </div>

            {logsQuery.isLoading ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Loading...</div>
            ) : filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No logs found</div>
            ) : (
              filteredLogs.map((log, i) => (
                <div key={log.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-xs hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: i < filteredLogs.length - 1 ? `1px solid ${C.border}20` : "none" }}>
                  <div className="col-span-3 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {log.createdAt ? new Date(log.createdAt).toLocaleString() : "—"}
                  </div>
                  <div className="col-span-3 truncate font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>{log.email}</div>
                  <div className="col-span-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium"
                      style={{
                        background: log.action === "pin_verified" ? `${C.teal}15` : `${C.amber}15`,
                        color: log.action === "pin_verified" ? C.teal : C.amber,
                      }}>
                      {log.action.replace(/_/g, " ")}
                    </span>
                  </div>
                  <div className="col-span-2 font-mono truncate" style={{ color: "rgba(255,255,255,0.35)" }}>{log.ipAddress || "—"}</div>
                  <div className="col-span-2 truncate" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {log.userAgent ? log.userAgent.slice(0, 40) + "..." : "—"}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ── SESSIONS TAB ── */}
        {activeTab === "sessions" && (
          <div className="rounded-xl overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}40` }}>
            <div className="grid grid-cols-12 gap-2 px-5 py-3 text-xs tracking-wider uppercase"
              style={{ background: C.surface, color: "rgba(255,255,255,0.35)", borderBottom: `1px solid ${C.border}40` }}>
              <div className="col-span-4">Email</div>
              <div className="col-span-3">Created</div>
              <div className="col-span-3">Expires</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {sessionsQuery.isLoading ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>Loading...</div>
            ) : (sessionsQuery.data?.length ?? 0) === 0 ? (
              <div className="p-8 text-center text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>No active sessions</div>
            ) : (
              sessionsQuery.data?.map((session, i) => (
                <div key={session.id} className="grid grid-cols-12 gap-2 px-5 py-3 items-center text-xs hover:bg-white/[0.02] transition-colors"
                  style={{ borderBottom: i < (sessionsQuery.data?.length ?? 0) - 1 ? `1px solid ${C.border}20` : "none" }}>
                  <div className="col-span-4 font-mono" style={{ color: "rgba(255,255,255,0.6)" }}>{session.email}</div>
                  <div className="col-span-3 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {session.createdAt ? new Date(session.createdAt).toLocaleString() : "—"}
                  </div>
                  <div className="col-span-3 font-mono" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {session.expiresAt ? new Date(session.expiresAt).toLocaleString() : "—"}
                  </div>
                  <div className="col-span-2 flex justify-end">
                    <button onClick={() => revokeSessionMutation.mutate({ id: session.id })}
                      className="px-3 py-1 rounded-lg text-[10px] font-medium hover:opacity-80 transition-opacity"
                      style={{ background: `${C.red}15`, color: C.red, border: `1px solid ${C.red}20` }}>
                      Revoke
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
