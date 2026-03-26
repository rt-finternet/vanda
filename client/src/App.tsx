import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AccessProvider, useAccess } from "./contexts/AccessContext";
import { lazy, Suspense } from "react";
import PinGate from "./pages/PinGate";
import VandaLanding from "./pages/VandaLanding";

// SG Blueprint pages (eagerly loaded, core navigation)
import SGExecutiveSummary from "./pages/sg/SGExecutiveSummary";
import SGProblem from "./pages/sg/SGProblem";
import SGArchitecture from "./pages/sg/SGArchitecture";
import SGCapabilities from "./pages/sg/SGCapabilities";
import SGAssets from "./pages/sg/SGAssets";
import SGFunding from "./pages/sg/SGFunding";

// SG Deep Dive pages (lazy loaded)
const SGDeepDiveUNITS = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveUNITS"));
const SGDeepDiveDVP = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveDVP"));
const SGDeepDiveTokenisation = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveTokenisation"));
const SGDeepDiveRegulatory = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveRegulatory"));
const SGDeepDiveCollateralHighway = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveCollateralHighway"));
const SGDeepDiveParticipants = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveParticipants"));
const SGDeepDiveVCC = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveVCC"));
const SGDeepDivePreciousMetals = lazy(() => import("./pages/sg/deep-dive/SGDeepDivePreciousMetals"));
const SGDeepDiveTokenPrograms = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveTokenPrograms"));
const SGDeepDivePTokets = lazy(() => import("./pages/sg/deep-dive/SGDeepDivePTokets"));
const SGDeepDiveCrossLedger = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveCrossLedger"));
const SGDeepDiveUnsponsoredTokets = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveUnsponsoredTokets"));
const SGDeepDiveStructuredNotes = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveStructuredNotes"));
const SGDeepDiveEquities = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveEquities"));
const SGDeepDiveWalletsRegisters = lazy(() => import("./pages/sg/deep-dive/SGDeepDiveWalletsRegisters"));

// SG Workflow pages (lazy loaded)
const SGWorkflows = lazy(() => import("./pages/sg/workflows/SGWorkflows"));
const SGWorkflowCDPBridge = lazy(() => import("./pages/sg/workflows/SGWorkflowCDPBridge"));
const SGWorkflowAtomicDvP = lazy(() => import("./pages/sg/workflows/SGWorkflowAtomicDvP"));
const SGWorkflowCollateralMobilisation = lazy(() => import("./pages/sg/workflows/SGWorkflowCollateralMobilisation"));
const SGWorkflowVCCTokenisation = lazy(() => import("./pages/sg/workflows/SGWorkflowVCCTokenisation"));
const SGWorkflowGoldTokenisation = lazy(() => import("./pages/sg/workflows/SGWorkflowGoldTokenisation"));
const SGWorkflowCommoditiesCollateral = lazy(() => import("./pages/sg/workflows/SGWorkflowCommoditiesCollateral"));
const SGWorkflowCrossBorder = lazy(() => import("./pages/sg/workflows/SGWorkflowCrossBorder"));

// Admin page (lazy loaded)
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

/* -- Loading Fallback -- */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#0A1628" }}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-t-transparent animate-spin" style={{ borderColor: "#F59E0B", borderTopColor: "transparent" }} />
        <span className="text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>Loading</span>
      </div>
    </div>
  );
}

/* -- Portal Routes (shown only after PIN auth) -- */
function PortalRoutes() {
  return (
    <Switch>
      {/* SG Blueprint (eagerly loaded) */}
      <Route path="/sg" component={SGExecutiveSummary} />
      <Route path="/sg/problem" component={SGProblem} />
      <Route path="/sg/architecture" component={SGArchitecture} />
      <Route path="/sg/capabilities" component={SGCapabilities} />
      <Route path="/sg/assets" component={SGAssets} />
      <Route path="/sg/funding" component={SGFunding} />

      {/* SG Deep Dives (lazy loaded) */}
      <Route path="/sg/deep-dive/units">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveUNITS /></Suspense>}</Route>
      <Route path="/sg/deep-dive/dvp-settlement">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveDVP /></Suspense>}</Route>
      <Route path="/sg/deep-dive/tokenisation">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveTokenisation /></Suspense>}</Route>
      <Route path="/sg/deep-dive/regulatory">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveRegulatory /></Suspense>}</Route>
      <Route path="/sg/deep-dive/collateral-highway">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveCollateralHighway /></Suspense>}</Route>
      <Route path="/sg/deep-dive/participants">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveParticipants /></Suspense>}</Route>
      <Route path="/sg/deep-dive/vcc">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveVCC /></Suspense>}</Route>
      <Route path="/sg/deep-dive/precious-metals">{() => <Suspense fallback={<PageLoader />}><SGDeepDivePreciousMetals /></Suspense>}</Route>
      <Route path="/sg/deep-dive/token-programs">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveTokenPrograms /></Suspense>}</Route>
      <Route path="/sg/deep-dive/p-tokets">{() => <Suspense fallback={<PageLoader />}><SGDeepDivePTokets /></Suspense>}</Route>
      <Route path="/sg/deep-dive/cross-ledger">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveCrossLedger /></Suspense>}</Route>
      <Route path="/sg/deep-dive/unsponsored-tokets">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveUnsponsoredTokets /></Suspense>}</Route>
      <Route path="/sg/deep-dive/structured-notes">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveStructuredNotes /></Suspense>}</Route>
      <Route path="/sg/deep-dive/equities">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveEquities /></Suspense>}</Route>
      <Route path="/sg/deep-dive/wallets-registers">{() => <Suspense fallback={<PageLoader />}><SGDeepDiveWalletsRegisters /></Suspense>}</Route>

      {/* SG Workflows (lazy loaded) */}
      <Route path="/sg/workflows">{() => <Suspense fallback={<PageLoader />}><SGWorkflows /></Suspense>}</Route>
      <Route path="/sg/workflows/cdp-bridge">{() => <Suspense fallback={<PageLoader />}><SGWorkflowCDPBridge /></Suspense>}</Route>
      <Route path="/sg/workflows/atomic-dvp">{() => <Suspense fallback={<PageLoader />}><SGWorkflowAtomicDvP /></Suspense>}</Route>
      <Route path="/sg/workflows/collateral-mobilisation">{() => <Suspense fallback={<PageLoader />}><SGWorkflowCollateralMobilisation /></Suspense>}</Route>
      <Route path="/sg/workflows/vcc-tokenisation">{() => <Suspense fallback={<PageLoader />}><SGWorkflowVCCTokenisation /></Suspense>}</Route>
      <Route path="/sg/workflows/gold-tokenisation">{() => <Suspense fallback={<PageLoader />}><SGWorkflowGoldTokenisation /></Suspense>}</Route>
      <Route path="/sg/workflows/commodities-collateral">{() => <Suspense fallback={<PageLoader />}><SGWorkflowCommoditiesCollateral /></Suspense>}</Route>
      <Route path="/sg/workflows/cross-border">{() => <Suspense fallback={<PageLoader />}><SGWorkflowCrossBorder /></Suspense>}</Route>

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

/* -- Access Gate -- wraps /sg/* routes only -- */
function AccessGate() {
  const { isAuthenticated, loading } = useAccess();

  if (loading) {
    return <PageLoader />;
  }

  if (!isAuthenticated) {
    return <PinGate />;
  }

  return <PortalRoutes />;
}

/* -- Main Router -- */
function Router() {
  const [location] = useLocation();

  // Landing page is public -- no PIN gate
  if (location === "/") {
    return <VandaLanding />;
  }

  // Admin page has its own master PIN gate -- no portal PIN gate needed
  if (location === "/admin") {
    return (
      <Suspense fallback={<PageLoader />}>
        <AdminDashboard />
      </Suspense>
    );
  }

  // Everything under /sg/* goes through the portal access gate
  return (
    <AccessProvider>
      <AccessGate />
    </AccessProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
