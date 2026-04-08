/**
 * VANDA IPE Page Tracker
 *
 * Automatically syncs the current wouter route with the IPE context.
 * Also fires page_view analytics events when the page changes.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useIPE } from "@/contexts/IPEContext";
import { useIPEAnalytics } from "@/hooks/useIPEAnalytics";

export default function IPEPageTracker() {
  const [location] = useLocation();
  const { setCurrentPage, activePersona } = useIPE();
  const { trackPageView } = useIPEAnalytics();

  useEffect(() => {
    // Only track /sg/* routes
    if (location.startsWith("/sg")) {
      setCurrentPage(location);
      // Fire analytics page view event
      if (activePersona) {
        trackPageView(activePersona.id, location);
      }
    }
  }, [location, setCurrentPage, activePersona, trackPageView]);

  return null;
}
