import {
  Dashboard,
  DashboardGraph,
  DashboardItemSize,
} from "@/models/dashboard/dashboard";
import { Platform } from "react-native";
import { generateId } from "../identification";

export function getLocalStorageDashboard(): Dashboard | null {
  if (Platform.OS === "ios") return null;

  const dashboard: Dashboard = JSON.parse(
    localStorage.getItem("dashboard") || "{}"
  );

  if (!dashboard.sections) return null;
  return dashboard;
}

export function setLocalStorageDashboard(dashboard: Dashboard) {
  if (Platform.OS === "ios") return null;

  localStorage.setItem("dashboard", JSON.stringify(dashboard));
}

export function updateLocalStorageDashboardSection(
  sectionId: string,
  title: string
) {
  if (Platform.OS === "ios") return;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    dashboard.sections[sectionIndex].title = title;
  }

  setLocalStorageDashboard(dashboard);
}

export function addLocalStorageDashboardGraph(
  sectionId: string,
  graph: Omit<DashboardGraph, "id" | "index">
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) dashboard = { sections: [] };

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0)
    dashboard.sections[sectionIndex].graphs.push({
      ...graph,
      id: generateId("dashboard-graph"),
      index: dashboard.sections[sectionIndex].graphs.length,
    });
  else {
    dashboard.sections.push({
      id: generateId("dashboard-section"),
      title: "Unsorted",
      graphs: [{ ...graph, id: generateId("dashboard-graph"), index: 0 }],
    });
  }

  setLocalStorageDashboard(dashboard);
}

export function updateLocalStorageDashboardGraph(
  graphId: string,
  sectionId: string,
  data: { title?: string; stacked?: boolean; size?: DashboardItemSize }
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) dashboard = { sections: [] };

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const graphIndex = dashboard.sections[sectionIndex].graphs.findIndex(
      (storedGraph) => storedGraph.id === graphId
    );

    if (graphIndex >= 0) {
      const graph = dashboard.sections[sectionIndex].graphs[graphIndex];

      if (data.title !== undefined) graph.title = data.title;
      if (data.stacked !== undefined) graph.stacked = data.stacked;
      if (data.size !== undefined) graph.size = data.size;

      dashboard.sections[sectionIndex].graphs[graphIndex] = graph;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function moveUpLocalStorageDashboardGraph(
  graphId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const graphIndex = dashboard.sections[sectionIndex].graphs.findIndex(
      (storedGraph) => storedGraph.id === graphId
    );

    if (graphIndex > 0) {
      const graph = dashboard.sections[sectionIndex].graphs[graphIndex];
      dashboard.sections[sectionIndex].graphs[graphIndex] =
        dashboard.sections[sectionIndex].graphs[graphIndex - 1];
      dashboard.sections[sectionIndex].graphs[graphIndex - 1] = graph;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function moveDownLocalStorageDashboardGraph(
  graphId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const graphIndex = dashboard.sections[sectionIndex].graphs.findIndex(
      (storedGraph) => storedGraph.id === graphId
    );

    if (graphIndex < dashboard.sections[sectionIndex].graphs.length - 1) {
      const graph = dashboard.sections[sectionIndex].graphs[graphIndex];
      dashboard.sections[sectionIndex].graphs[graphIndex] =
        dashboard.sections[sectionIndex].graphs[graphIndex + 1];
      dashboard.sections[sectionIndex].graphs[graphIndex + 1] = graph;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function removeLocalStorageDashboardGraph(
  graphId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );
  if (sectionIndex < 0) return;

  const graphIndex = dashboard?.sections[sectionIndex].graphs.findIndex(
    (dashboardGraph) => dashboardGraph.id === graphId
  );
  if (graphIndex < 0) return;

  dashboard.sections[sectionIndex].graphs.splice(graphIndex, 1);

  setLocalStorageDashboard(dashboard);
}
