import { CardFilters } from "../sorted-cards/sorted-cards";

export interface Dashboard {
  sections: DashboardSection[];
}

export interface DashboardSection {
  title: string;
  graphs: DashboardGraph[];
}

export interface DashboardGraph {
  title: string;
  type: string;
  filters: CardFilters;
}
