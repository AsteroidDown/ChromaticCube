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
  title: string;
  type: string;
  stacked: boolean;
  filters: CardFilters;
}
