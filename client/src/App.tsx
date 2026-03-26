import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// SG Blueprint pages
import SGExecutiveSummary from "./pages/sg/SGExecutiveSummary";
import SGProblem from "./pages/sg/SGProblem";
import SGArchitecture from "./pages/sg/SGArchitecture";
import SGCapabilities from "./pages/sg/SGCapabilities";
import SGAssets from "./pages/sg/SGAssets";
import SGFunding from "./pages/sg/SGFunding";

// SG Deep Dive pages
import SGDeepDiveUNITS from "./pages/sg/deep-dive/SGDeepDiveUNITS";
import SGDeepDiveDVP from "./pages/sg/deep-dive/SGDeepDiveDVP";
import SGDeepDiveTokenisation from "./pages/sg/deep-dive/SGDeepDiveTokenisation";
import SGDeepDiveRegulatory from "./pages/sg/deep-dive/SGDeepDiveRegulatory";
import SGDeepDiveCollateralHighway from "./pages/sg/deep-dive/SGDeepDiveCollateralHighway";
import SGDeepDiveParticipants from "./pages/sg/deep-dive/SGDeepDiveParticipants";
import SGDeepDiveVCC from "./pages/sg/deep-dive/SGDeepDiveVCC";

// SG Workflow pages
import SGWorkflows from "./pages/sg/workflows/SGWorkflows";
import SGWorkflowCDPBridge from "./pages/sg/workflows/SGWorkflowCDPBridge";
import SGWorkflowAtomicDvP from "./pages/sg/workflows/SGWorkflowAtomicDvP";
import SGWorkflowCollateralMobilisation from "./pages/sg/workflows/SGWorkflowCollateralMobilisation";
import SGWorkflowVCCTokenisation from "./pages/sg/workflows/SGWorkflowVCCTokenisation";

function Router() {
  return (
    <Switch>
      {/* Redirect root to /sg */}
      <Route path="/">
        <Redirect to="/sg" />
      </Route>

      {/* SG Blueprint */}
      <Route path="/sg" component={SGExecutiveSummary} />
      <Route path="/sg/problem" component={SGProblem} />
      <Route path="/sg/architecture" component={SGArchitecture} />
      <Route path="/sg/capabilities" component={SGCapabilities} />
      <Route path="/sg/assets" component={SGAssets} />
      <Route path="/sg/funding" component={SGFunding} />

      {/* SG Deep Dives */}
      <Route path="/sg/deep-dive/units" component={SGDeepDiveUNITS} />
      <Route path="/sg/deep-dive/dvp-settlement" component={SGDeepDiveDVP} />
      <Route path="/sg/deep-dive/tokenisation" component={SGDeepDiveTokenisation} />
      <Route path="/sg/deep-dive/regulatory" component={SGDeepDiveRegulatory} />
      <Route path="/sg/deep-dive/collateral-highway" component={SGDeepDiveCollateralHighway} />
      <Route path="/sg/deep-dive/participants" component={SGDeepDiveParticipants} />
      <Route path="/sg/deep-dive/vcc" component={SGDeepDiveVCC} />

      {/* SG Workflows */}
      <Route path="/sg/workflows" component={SGWorkflows} />
      <Route path="/sg/workflows/cdp-bridge" component={SGWorkflowCDPBridge} />
      <Route path="/sg/workflows/atomic-dvp" component={SGWorkflowAtomicDvP} />
      <Route path="/sg/workflows/collateral-mobilisation" component={SGWorkflowCollateralMobilisation} />
      <Route path="/sg/workflows/vcc-tokenisation" component={SGWorkflowVCCTokenisation} />

      {/* 404 */}
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
