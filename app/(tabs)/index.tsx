import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Graph } from "../../components/graph/graph";
import Box from "../../components/ui/box/box";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "../../functions/card-graphing";
import { Card } from "../../models/card/card";
import { GraphLayoutProps } from "../../components/graph/layout/graph-layout";

export default function App() {
  const [stacked, setStacked] = React.useState(true);

  function getStoredCards(): Card[] {
    if (Platform.OS === "ios") return [];

    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  const numCardsTitle: string = "# of Cards";

  const cardsByColourGraphLayoutProps: GraphLayoutProps = {
    title: "Cards By Colour",
    horizontalTitle: "Colour",
    verticalTitle: numCardsTitle,
    stacked: stacked,
    sets: graphCardsByColor(getStoredCards())
  }

  const cardsByCostGraphLayoutProps: GraphLayoutProps = {
    title: "Cards By Cost",
    horizontalTitle: "Cost",
    verticalTitle: numCardsTitle,
    stacked: stacked,
    sets: graphCardsByCost(getStoredCards())
  }

  const cardsByTypeGraphLayoutProps: GraphLayoutProps = {
    title: "Cards By Type",
    horizontalTitle: "Type",
    verticalTitle: numCardsTitle,
    stacked: stacked,
    sets: graphCardsByType(getStoredCards())
  }

  return (
    <View className="flex gap-6 flex-1 justify-center bg-background-100 p-6">
      <Pressable onPress={() => setStacked(!stacked)}>
        <Text className="color-white">{stacked ? "Stacked" : "Grouped"}</Text>
      </Pressable>

      <ScrollView>
        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box className="min-w-max overflow-x-scroll overflow-y-hidden">
            <Graph
              graphLayoutProps={cardsByColourGraphLayoutProps}
            />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              graphLayoutProps={cardsByCostGraphLayoutProps}
            />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              graphLayoutProps={cardsByTypeGraphLayoutProps}
            />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}
