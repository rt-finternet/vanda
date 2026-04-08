/**
 * VANDA IPE Page Tracker
 *
 * Automatically syncs the current wouter route with the IPE context.
 * Wrap this around the portal routes or place it inside the PortalRoutes component.
 */
import { useEffect } from "react";
import { useLocation } from "wouter";
import { useIPE } from "@/contexts/IPEContext";

export default function IPEPageTracker() {
  const [location] = useLocation();
  const { setCurrentPage } = useIPE();

  useEffect(() => {
    // Only track /sg/* routes
    if (location.startsWith("/sg")) {
      setCurrentPage(location);
    }
  }, [location, setCurrentPage]);

  return null;
}
