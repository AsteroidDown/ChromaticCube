import React from "react";
import { Platform, Pressable, ScrollView, Text, View } from "react-native";
import { Graph } from "../../components/graph/graph";
import Box from "../../components/ui/box/box";
import {
  graphCardsByColor,
  graphCardsByCost,
} from "../../functions/card-graphing";
import { Card } from "../../models/card";

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
          <Box classes="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              title="Cards by Color"
              horizontalTitle="Color"
              stacked={stacked}
              data={graphCardsByColor(getStoredCards())}
            />
          </Box>

          <Box classes="max-w-full overflow-x-scroll overflow-y-hidden">
            <Graph
              title="Cards by Color"
              horizontalTitle="Color"
              stacked={stacked}
              data={graphCardsByCost(getStoredCards())}
            />
          </Box>
        </View>
      </ScrollView>
    </View>
  );
}
// const data1: SetData = {
//   title: "1",
//   data: [
//     { count: 2, name: "White", color: "white" },
//     { count: 3, name: "Blue", color: "blue" },
//     { count: 2, name: "Black", color: "black" },
//     { count: 1, name: "Red", color: "red" },
//     { count: 2, name: "Green", color: "green" },
//   ],
// };

// const data2: SetData = {
//   title: "2",
//   data: [
//     { count: 3, name: "White", color: "white" },
//     { count: 3, name: "Blue", color: "blue" },
//     { count: 2, name: "Black", color: "black" },
//     { count: 3, name: "Red", color: "red" },
//     { count: 2, name: "Green", color: "green" },
//   ],
// };

// const data3: SetData = {
//   title: "3",
//   data: [
//     { count: 4, name: "White", color: "white" },
//     { count: 3, name: "Blue", color: "blue" },
//     { count: 2, name: "Black", color: "black" },
//     { count: 7, name: "Red", color: "red" },
//     { count: 3, name: "Green", color: "green" },
//   ],
// };

// const data4: SetData = {
//   title: "4",
//   data: [
//     { count: 3, name: "White", color: "white" },
//     { count: 1, name: "Blue", color: "blue" },
//     { count: 3, name: "Black", color: "black" },
//     { count: 2, name: "Red", color: "red" },
//     { count: 3, name: "Green", color: "green" },
//   ],
// };

// const graphData: GraphProps = {
//   title: "Test Data",
//   horizontalTitle: "Mana Cost",
//   data: [data1, data2, data3, data4],
// };

{
  /* <Box classes="w-fit">
            <Graph
              data={graphData.data}
              title={graphData.title}
              stacked={stacked}
              horizontalTitle={graphData.horizontalTitle}
            ></Graph>
          </Box> */
}

{
  /* <Box classes="w-fit">
            <Graph
              title="Curve"
              horizontalTitle="Mana Cost"
              data={[
                {
                  title: "1",
                  data: [{ count: 2, name: "One Cost", color: "green" }],
                },
                {
                  title: "2",
                  data: [{ count: 6, name: "Two Cost", color: "green" }],
                },
                {
                  title: "3",
                  data: [{ count: 4, name: "Three Cost", color: "green" }],
                },
                {
                  title: "4",
                  data: [{ count: 3, name: "Four Cost", color: "green" }],
                },
                {
                  title: "5",
                  data: [{ count: 2, name: "Five Cost", color: "green" }],
                },
                {
                  title: "6+",
                  data: [{ count: 1, name: "Six+ Cost", color: "green" }],
                },
              ]}
            ></Graph>
          </Box> */
}