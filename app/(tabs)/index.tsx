import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Graph } from "../../components/graph/graph";
import { SetData } from "../../components/graph/layout/graph-plot";
import Box from "../../components/ui/box/box";
import { MTGColor, MTGColorMap } from "../../constants/colors";
import { Card } from "../../models/card";

export default function App() {
  const [stacked, setStacked] = React.useState(false);

  function getStoredCards(): Card[] {
    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  function getCurve() {
    const cards = getStoredCards();
  }

  function sortByColor(cards: Card[]) {
    const colors: MTGColor[] = [
      "white",
      "blue",
      "black",
      "red",
      "green",
      "gold",
      "colorless",
      "land",
    ];

    const data: SetData[] = colors.map((color) => {
      let sortedCards: Card[] = [];

      if (color === "gold") {
        sortedCards = cards.filter(
          (card) =>
            card.colorIdentity.length > 1 &&
            !card.typeLine.toLowerCase().includes("land")
        );
      } else if (color === "colorless") {
        sortedCards = cards.filter((card) => card.colorIdentity.length === 0);
      } else if (color === "land") {
        sortedCards = cards.filter((card) =>
          card.faces
            ? card.faces.front.typeLine.toLowerCase().includes("land")
            : card.typeLine.toLowerCase().includes("land")
        );
      } else {
        sortedCards = cards.filter(
          (card) =>
            card.colorIdentity.length === 1 &&
            card.colorIdentity[0] === MTGColorMap.get(color)
        );
      }

      const setData: SetData = {
        title: color,
        data: [
          {
            count: sortedCards.length,
            name: color.charAt(0).toUpperCase() + color.slice(1),
            color,
          },
        ],
      };

      return setData;
    });

    return data;
  }

  return (
    <View className="flex gap-6 flex-1 justify-center bg-background-100 p-6">
      <Pressable onPress={() => setStacked(!stacked)}>
        <Text className="color-white">{stacked ? "Stacked" : "Grouped"}</Text>
      </Pressable>

      <ScrollView>
        <View className="flex flex-row flex-wrap gap-6 justify-center items-center">
          <Box classes="max-w-full overflow-x-scroll">
            <Graph
              title="Cards by Color"
              horizontalTitle="Color"
              stacked={stacked}
              data={sortByColor(getStoredCards())}
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
