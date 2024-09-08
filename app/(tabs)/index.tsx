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

export default function App() {
  const [stacked, setStacked] = React.useState(true);

  function getStoredCards(): Card[] {
    if (Platform.OS === "ios") return [];

    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  return (
    <View className="flex gap-6 flex-1 justify-center bg-background-100 p-6">
      <Pressable onPress={() => setStacked(!stacked)}>
        <Text className="color-white">{stacked ? "Stacked" : "Grouped"}</Text>
      </Pressable>

      <ScrollView>
        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              title="Cards by Color"
              horizontalTitle="Color"
              stacked={stacked}
              data={graphCardsByColor(getStoredCards())}
            />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              title="Cards by Cost"
              horizontalTitle="Cost"
              stacked={stacked}
              data={graphCardsByCost(getStoredCards())}
            />
          </Box>

          <Box className="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              title="Cards by Type"
              horizontalTitle="Type"
              stacked={stacked}
              data={graphCardsByType(getStoredCards())}
            />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}
