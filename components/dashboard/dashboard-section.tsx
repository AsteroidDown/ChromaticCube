import Graph from "@/components/graph/graph";
import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import { filterCards } from "@/functions/card-filtering";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "@/functions/card-graphing";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import {
  getLocalStorageDashboard,
  updateLocalStorageDashboardItem,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { Card } from "@/models/card/card";
import { DashboardSection } from "@/models/dashboard/dashboard";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import {
  faChartSimple,
  faDatabase,
  faInfoCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { View, ViewProps } from "react-native";
import Placeholder from "../ui/placeholder/placeholder";
import DashboardAddItemMenu from "./dashboard-add-item-menu";
import DashboardItemMenu from "./dashboard-item-menu";
import DashboardSectionHeader from "./dashboard-section-header";

export type DashboardSectionProps = ViewProps & {
  sectionId: string;
};

export default function DashboardSectionView({
  sectionId,
}: DashboardSectionProps) {
  const { dashboard, setDashboard } = useContext(DashboardContext);

  const [section, setSection] = React.useState(null as DashboardSection | null);

  const [addItemOpen, setAddItemOpen] = React.useState(false);

  const storedCards = getLocalStorageStoredCards();

  useEffect(
    () =>
      setSection(
        dashboard?.sections.find((section) => section.id === sectionId) || null
      ),
    [dashboard, sectionId]
  );

  function toggleStacked(graphId: string, stacked: boolean) {
    if (!section) return;

    updateLocalStorageDashboardItem(graphId, section.id, { stacked });
    setDashboard(getLocalStorageDashboard());
  }

  if (!section) return <Placeholder title="No Section Found!" />;

  return (
    <View className="flex gap-4 justify-center items-center w-full">
      <DashboardSectionHeader section={section} />

      <View className="flex flex-row flex-wrap gap-4 justify-start items-center w-full z-[-1]">
        {section.items.map((item, index) => (
          <View
            key={item.title + index}
            className={`flex-1 h-80 min-w-full overflow-hidden transition-all duration-500 ${
              item.size === "sm"
                ? "lg:min-w-[25%] lg:max-w-[33%]"
                : item.size === "md"
                ? "lg:min-w-[50%] lg:max-w-[66%]"
                : "lg:min-w-[100%]"
            }`}
          >
            <Box className="w-full h-full !bg-background-100 border-2 border-background-300 overflow-x-scroll overflow-y-hidden">
              <Graph
                id={item.id}
                sectionId={section.id}
                title={item.title}
                stacked={item.stacked}
                horizontalTitle={titleCase(item.type)}
                sets={getSets(item.type, item.filters, storedCards)}
                titleStart={
                  <Button
                    rounded
                    type="clear"
                    action="default"
                    icon={item.stacked ? faDatabase : faChartSimple}
                    onClick={() => toggleStacked(item.id, !item.stacked)}
                  />
                }
                titleEnd={
                  <DashboardItemMenu graph={item} sectionId={section.id} />
                }
              />
            </Box>
          </View>
        ))}

        {!section.items.length && (
          <Placeholder
            title="No Graphs Added!"
            subtitle="Add some to get started"
            icon={faInfoCircle}
          >
            <Button
              text="Add Graph"
              className="mt-4"
              icon={faPlus}
              onClick={() => setAddItemOpen(true)}
            >
              <DashboardAddItemMenu
                sectionId={section.id}
                addItemOpen={addItemOpen}
                setAddItemOpen={setAddItemOpen}
              />
            </Button>
          </Placeholder>
        )}
      </View>
    </View>
  );
}

function getSets(type: string, filters: CardFilters, cards: Card[]) {
  if (type === "cost") {
    return graphCardsByCost(filterCards(cards, filters));
  } else if (type === "color") {
    return graphCardsByColor(filterCards(cards, filters));
  } else if (type === "type") {
    return graphCardsByType(filterCards(cards, filters));
  } else return [];
}
