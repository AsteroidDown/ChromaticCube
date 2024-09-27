import { Dashboard, DashboardGraph } from "@/models/dashboard/dashboard";
import { Platform } from "react-native";

export function getLocalStorageDashboard(): Dashboard | null {
  if (Platform.OS === "ios") return null;

  const dashboard: Dashboard = JSON.parse(
    localStorage.getItem("dashboard") || "{}"
  );

  return dashboard;
}

export function setLocalStorageDashboard(dashboard: Dashboard) {
  if (Platform.OS === "ios") return null;

  localStorage.setItem("dashboard", JSON.stringify(dashboard));
}

export function setLocalStorageDashboardGraph(
  section: string,
  graph: DashboardGraph
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) dashboard = { sections: [] };

  const graphIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.title === section
  );

  if (graphIndex >= 0) dashboard.sections[graphIndex].graphs.push(graph);
  else {
    dashboard.sections.push({
      title: "Unsorted",
      graphs: [graph],
    });
  }

  setLocalStorageDashboard(dashboard);
}
