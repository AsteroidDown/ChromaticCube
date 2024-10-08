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
  faTextHeight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { View, ViewProps } from "react-native";
import Chart, { ChartType } from "../chart/chart";
import Placeholder from "../ui/placeholder/placeholder";
import DashboardSectionOptionsMenu from "./dashboard-add-item-menu";
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

  const itemClasses =
    "flex-1 min-w-full h-80 !bg-background-100 border-2 border-background-300 overflow-x-scroll overflow-y-hidden transition-all duration-500";

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

  function setItemTitleSize(itemId: string, smallTitles: boolean) {
    if (!itemId || !sectionId) return;

    updateLocalStorageDashboardItem(itemId, sectionId, { smallTitles });
    setDashboard(getLocalStorageDashboard());
  }

  return (
    <View className="flex gap-4 justify-center items-center w-full">
      <DashboardSectionHeader section={section} />

      <View className="flex flex-row flex-wrap gap-4 justify-start items-center w-full z-[-1]">
        {section.items.map((item, index) => (
          <Box
            key={item.title + index}
            className={`${itemClasses} ${
              item.itemType === "chart" ? "!p-0" : ""
            } ${
              item.size === "sm"
                ? "lg:min-w-[25%] lg:max-w-[33%]"
                : item.size === "md"
                ? "lg:min-w-[45%] lg:max-w-[66%]"
                : "lg:min-w-[100%]"
            }`}
          >
            {item.itemType === "graph" && (
              <Graph
                id={item.id}
                sectionId={section.id}
                title={item.title}
                stacked={item.stacked}
                horizontalTitle={titleCase(item.sortType)}
                sets={getSets(item.sortType, item.filters, storedCards)}
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
                  <DashboardItemMenu
                    xOffset={-100}
                    item={item}
                    sectionId={section.id}
                  />
                }
              />
            )}

            {item.itemType === "chart" && (
              <Chart
                id={item.id}
                sectionId={section.id}
                title={item.title}
                type={item.sortType as ChartType}
                filters={item.filters}
                smallTitles={item.smallTitles}
                titleStart={
                  <Button
                    rounded
                    type="clear"
                    action="default"
                    icon={faTextHeight}
                    onClick={() => setItemTitleSize(item.id, !item.smallTitles)}
                  />
                }
                titleEnd={
                  <DashboardItemMenu
                    xOffset={-100}
                    item={item}
                    sectionId={section.id}
                  />
                }
              />
            )}
          </Box>
        ))}

        {!section.items.length && (
          <Placeholder
            title="No Items Added!"
            subtitle="Add some to get started"
            icon={faInfoCircle}
          >
            <Button
              text="Add Item"
              className="mt-4"
              icon={faPlus}
              onClick={() => setAddItemOpen(true)}
            />

            <DashboardSectionOptionsMenu
              addOnly
              xOffset={-8}
              section={section}
              addItemOpen={addItemOpen}
              setAddItemOpen={setAddItemOpen}
            />
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
