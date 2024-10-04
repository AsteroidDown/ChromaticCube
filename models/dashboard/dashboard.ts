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

export interface DashboardItem {
  id: string;
  index: number;
  title: string;
  type: string;
  size: DashboardItemSize;
  stacked: boolean;
  filters: CardFilters;
}
