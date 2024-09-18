import { Graph, GraphProps } from "@/components/graph/graph";
import Box from "@/components/ui/box/box";
import {
  graphCardsByColor,
  graphCardsByCost,
  graphCardsByType,
} from "@/functions/card-graphing";
import { getLocalStorageStoredCards } from "@/functions/local-storage";
import { Card } from "@/models/card/card";
import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function App() {
  const [stacked, setStacked] = React.useState(true);

  function getStoredCards(): Card[] {
    return getLocalStorageStoredCards();
  }

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

      <ScrollView>
        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box className="min-w-max overflow-x-scroll overflow-y-hidden">
            <Graph {...cardsByColorGraphProps} />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph {...cardsByCostGraphProps} />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph {...cardsByTypeGraphProps} />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}
