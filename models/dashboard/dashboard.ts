import { CardFilters } from "../sorted-cards/sorted-cards";

export interface Dashboard {
  sections: DashboardSection[];
}

export interface DashboardSection {
  id: string;
  title: string;
  graphs: DashboardGraph[];
}

export interface DashboardGraph {
  id: string;
  index: number;
  title: string;
  type: string;
  size: GraphSize;
  stacked: boolean;
  filters: CardFilters;
}

export type GraphSize = "sm" | "md" | "lg";
