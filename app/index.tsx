import React from "react";
import { View } from "react-native";
import CardDetails from "../components/card-details/card-details";
import { GraphProps } from "../components/graph/graph";
import { SetData } from "../components/graph/layout/graph-plot";
import SearchBar from "../components/ui/search-bar/search-bar";
import "../global.css";
import CardsService from "../hooks/cards.service";
import { Card } from "../models/card";

export default function App() {
  const data1: SetData = {
    title: "1",
    data: [
      { count: 2, name: "White", color: "white" },
      { count: 3, name: "Blue", color: "blue" },
      { count: 2, name: "Black", color: "black" },
      { count: 1, name: "Red", color: "red" },
      { count: 2, name: "Green", color: "green" },
    ],
  };

  const data2: SetData = {
    title: "2",
    data: [
      { count: 3, name: "White", color: "white" },
      { count: 3, name: "Blue", color: "blue" },
      { count: 2, name: "Black", color: "black" },
      { count: 3, name: "Red", color: "red" },
      { count: 2, name: "Green", color: "green" },
    ],
  };

  const data3: SetData = {
    title: "3",
    data: [
      { count: 4, name: "White", color: "white" },
      { count: 3, name: "Blue", color: "blue" },
      { count: 2, name: "Black", color: "black" },
      { count: 7, name: "Red", color: "red" },
      { count: 3, name: "Green", color: "green" },
    ],
  };

  const data4: SetData = {
    title: "4",
    data: [
      { count: 3, name: "White", color: "white" },
      { count: 1, name: "Blue", color: "blue" },
      { count: 3, name: "Black", color: "black" },
      { count: 2, name: "Red", color: "red" },
      { count: 3, name: "Green", color: "green" },
    ],
  };

  const graphData: GraphProps = {
    title: "Test Data",
    horizontalTitle: "Mana Cost",
    data: [data1, data2, data3, data4],
  };

  const [stacked, setStacked] = React.useState(false);
  const [card, setCard] = React.useState(null as Card | null);

  function getCard() {
    CardsService.getCard(search)
      .then((card) => setCard(card))
      .catch((error) => console.error(error));
  }

  const [search, onSearchChange] = React.useState("");

  return (
    <View className="flex gap-6 flex-1 items-center justify-center bg-background-100">
      {/* <View className="flex flex-row gap-4">
        <Pressable onPress={() => setStacked(!stacked)}>
          <Text className="color-white">{stacked ? "Stacked" : "Grouped"}</Text>
        </Pressable>

        <Pressable onPress={() => getCard()}>
          <Text className="color-white">Get Card</Text>
        </Pressable>
      </View> */}

      <View className="flex gap-4 items-center max-w-fit mx-auto">
        <SearchBar
          search={search}
          onSearchChange={onSearchChange}
          searchAction={getCard}
        />

        <CardDetails card={card} />
      </View>

      {/* <Graph
        data={graphData.data}
        title={graphData.title}
        stacked={stacked}
        horizontalTitle={graphData.horizontalTitle}
      ></Graph>

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
      ></Graph> */}
    </View>
  );
}
