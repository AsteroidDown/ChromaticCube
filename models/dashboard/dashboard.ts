import { CardFilters } from "../sorted-cards/sorted-cards";

export interface Dashboard {
  sections: DashboardSection[];
}

export interface DashboardSection {
  id: string;
  title: string;
  items: DashboardItem[];
}

export type DashboardItemSize = "sm" | "md" | "lg";
export type DashboardItemType = "graph" | "chart";

export interface DashboardItem {
  id: string;
  index: number;
  title: string;
  itemType: DashboardItemType;
  sortType: string;
  size: DashboardItemSize;
  filters: CardFilters;

  stacked?: boolean;
  smallTitles?: boolean;
}
