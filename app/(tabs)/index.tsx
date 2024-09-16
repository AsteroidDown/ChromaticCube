import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Graph, GraphProps } from "../../components/graph/graph";
import Box from "../../components/ui/box/box";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "../../functions/card-graphing";
import { Card } from "../../models/card/card";

export default function App() {
  /**
   * Functions
   */
  function getStoredCards(): Card[] {
    if (Platform.OS === "ios") return [];

    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  /**
   * Constants
   */
  const [stacked, setStacked] = React.useState(true);

  const cardsByColorGraphProps: GraphProps = {
    title: "Cards By Color",
    horizontalTitle: "Color",
    stacked: stacked,
    sets: graphCardsByColor(getStoredCards()),
  };

  const cardsByCostGraphProps: GraphProps = {
    title: "Cards By Cost",
    horizontalTitle: "Cost",
    stacked: stacked,
    sets: graphCardsByCost(getStoredCards()),
  };

  const cardsByTypeGraphProps: GraphProps = {
    title: "Cards By Type",
    horizontalTitle: "Type",
    stacked: stacked,
    sets: graphCardsByType(getStoredCards()),
  };

  return (
    <View className="flex gap-6 flex-1 justify-center bg-background-100 p-6">
      <Pressable onPress={() => setStacked(!stacked)}>
        <Text className="color-white">{stacked ? "Stacked" : "Grouped"}</Text>
      </Pressable>

      <ScrollView className="overflow-x-scroll">
        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box className="overflow-hidden">
            <Graph {...cardsByColorGraphProps} />
          </Box>

          <Box className="overflow-hidden">
            <Graph {...cardsByCostGraphProps} />
          </Box>

          <Box className="overflow-hidden">
            <Graph {...cardsByTypeGraphProps} />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}