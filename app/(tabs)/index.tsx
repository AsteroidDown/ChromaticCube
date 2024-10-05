import Chart from "@/components/chart/chart";
import DashboardSectionView from "@/components/dashboard/dashboard-section";
import Graph, { GraphProps } from "@/components/graph/graph";
import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "@/functions/card-graphing";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { Card } from "@/models/card/card";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import React, { useContext } from "react";
import { ScrollView, View } from "react-native";

export default function App() {
  const { dashboard } = useContext(DashboardContext);

  const [stacked, setStacked] = React.useState(true);

  function getStoredCards(): Card[] {
    return getLocalStorageStoredCards();
  }

  const cardsByColorGraphProps: GraphProps = {
    id: "cardsByColor",
    sectionId: "general",
    title: "Cards By Color",
    horizontalTitle: "Color",
    stacked: stacked,
    sets: graphCardsByColor(getStoredCards()),
  };

  const cardsByCostGraphProps: GraphProps = {
    id: "cardsByCost",
    sectionId: "general",
    title: "Cards By Cost",
    horizontalTitle: "Cost",
    stacked: stacked,
    sets: graphCardsByCost(getStoredCards()),
  };

  const cardsByTypeGraphProps: GraphProps = {
    id: "cardsByType",
    sectionId: "general",
    title: "Cards By Type",
    horizontalTitle: "Type",
    stacked: stacked,
    sets: graphCardsByType(getStoredCards()),
  };

  const colorFilters: CardFilters = {
    colorFilter: [
      "white",
      "blue",
      "black",
      "red",
      "green",
      "gold",
      "colorless",
    ],
  };

  return (
    <View className="flex gap-6 flex-1 justify-center bg-background-100 px-6">
      <ScrollView>
        <Button
          className="mx-auto max-w-fit mb-4"
          text={stacked ? "Stacked" : "Grouped"}
          onClick={() => setStacked(!stacked)}
        />

        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box className="flex-1 h-80 lg:min-w-[40%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Graph {...cardsByColorGraphProps} />
          </Box>

          <Box className="flex-1 h-80 lg:min-w-[40%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Graph {...cardsByCostGraphProps} />
          </Box>

          <Box className="flex-1 h-80 !p-0 lg:min-w-[25%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Chart smallTitles={true} type="cost" filters={colorFilters} />
          </Box>

          <Box className="flex-1 h-80 !p-0 lg:min-w-[25%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Chart type="rarity" filters={colorFilters} />
          </Box>

          <Box className="flex-1 h-80 !p-0 lg:min-w-[25%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Chart type="type" filters={colorFilters} />
          </Box>

          <Box className="flex-1 h-80 lg:min-w-[40%] min-w-full !bg-background-100 border-2 border-background-300 overflow-hidden">
            <Graph {...cardsByTypeGraphProps} />
          </Box>

          {dashboard?.sections.map((section, index) => (
            <DashboardSectionView
              sectionId={section.id}
              key={section.title + index}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
