import {
  Dashboard,
  DashboardItem,
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

export function addLocalStorageDashboardSection(title: string) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const newSection = {
    id: generateId("dashboard-section"),
    title,
    items: [],
  };

  dashboard.sections.push(newSection);

  setLocalStorageDashboard(dashboard);

  return newSection.id;
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

export function removeLocalStorageDashboardSection(sectionId: string) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    dashboard.sections.splice(sectionIndex, 1);
  }

  setLocalStorageDashboard(dashboard);
}

export function addLocalStorageDashboardItem(
  sectionId: string,
  item: Omit<DashboardItem, "id" | "index">
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) dashboard = { sections: [] };

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0)
    dashboard.sections[sectionIndex].items.push({
      ...item,
      id: generateId("dashboard-item"),
      index: dashboard.sections[sectionIndex].items.length,
    });
  else {
    const sectionIndex = dashboard?.sections?.findIndex(
      (dashboardSection) => dashboardSection.title === "Unsorted"
    );

    if (sectionIndex >= 0) {
      dashboard.sections[sectionIndex].items.push({
        ...item,
        id: generateId("dashboard-item"),
        index: dashboard.sections[sectionIndex].items.length,
      });
    } else {
      dashboard.sections.push({
        id: generateId("dashboard-section"),
        title: "Unsorted",
        items: [{ ...item, id: generateId("dashboard-item"), index: 0 }],
      });
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function updateLocalStorageDashboardItem(
  itemId: string,
  sectionId: string,
  data: {
    title?: string;
    stacked?: boolean;
    size?: DashboardItemSize;
    smallTitles?: boolean;
  }
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard?.sections) dashboard = { sections: [] };

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const itemIndex = dashboard.sections[sectionIndex].items.findIndex(
      (storedItem) => storedItem.id === itemId
    );

    if (itemIndex >= 0) {
      const item = dashboard.sections[sectionIndex].items[itemIndex];

      if (data.title !== undefined) item.title = data.title;
      if (data.stacked !== undefined) item.stacked = data.stacked;
      if (data.size !== undefined) item.size = data.size;
      if (data.smallTitles !== undefined) item.smallTitles = data.smallTitles;

      dashboard.sections[sectionIndex].items[itemIndex] = item;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function moveUpLocalStorageDashboardItem(
  itemId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const itemIndex = dashboard.sections[sectionIndex].items.findIndex(
      (storeItem) => storeItem.id === itemId
    );

    if (itemIndex > 0) {
      const item = dashboard.sections[sectionIndex].items[itemIndex];
      dashboard.sections[sectionIndex].items[itemIndex] =
        dashboard.sections[sectionIndex].items[itemIndex - 1];
      dashboard.sections[sectionIndex].items[itemIndex - 1] = item;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function moveDownLocalStorageDashboardItem(
  itemId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );

  if (sectionIndex >= 0) {
    const itemIndex = dashboard.sections[sectionIndex].items.findIndex(
      (storedItem) => storedItem.id === itemId
    );

    if (itemIndex < dashboard.sections[sectionIndex].items.length - 1) {
      const item = dashboard.sections[sectionIndex].items[itemIndex];
      dashboard.sections[sectionIndex].items[itemIndex] =
        dashboard.sections[sectionIndex].items[itemIndex + 1];
      dashboard.sections[sectionIndex].items[itemIndex + 1] = item;
    }
  }

  setLocalStorageDashboard(dashboard);
}

export function removeLocalStorageDashboardItem(
  itemId: string,
  sectionId: string
) {
  if (Platform.OS === "ios") return null;

  let dashboard: Dashboard | null = getLocalStorageDashboard();
  if (!dashboard) return;

  const sectionIndex = dashboard?.sections?.findIndex(
    (dashboardSection) => dashboardSection.id === sectionId
  );
  if (sectionIndex < 0) return;

  const itemIndex = dashboard?.sections[sectionIndex].items.findIndex(
    (dashboardItem) => dashboardItem.id === itemId
  );
  if (itemIndex < 0) return;

  dashboard.sections[sectionIndex].items.splice(itemIndex, 1);

  setLocalStorageDashboard(dashboard);
}
