import { Dashboard } from "@/models/dashboard/dashboard";
import { createContext } from "react";

const DashboardContext = createContext({
  dashboard: null as Dashboard | null,
  setDashboard: {} as any,
});

export default DashboardContext;
