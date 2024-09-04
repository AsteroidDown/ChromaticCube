import React from "react";
import { View } from "react-native";
import { Graph, GraphProps } from "../components/graph/graph";
import { SetData } from "../components/graph/layout/graph-plot";
import "../global.css";

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

  return (
    <View className="flex gap-6 flex-1 items-center justify-center bg-background-100">
      <Graph
        data={graphData.data}
        title={graphData.title}
        horizontalTitle={graphData.horizontalTitle}
      ></Graph>

      <Graph
        title="Curve"
        horizontalTitle="Mana Cost"
        data={[
          {
            title: "1",
            data: [{ count: 2, name: "One-Drops", color: "green" }],
          },
          {
            title: "2",
            data: [{ count: 6, name: "Two-Drops", color: "green" }],
          },
          {
            title: "3",
            data: [{ count: 4, name: "Three-Drops", color: "green" }],
          },
          {
            title: "4",
            data: [{ count: 3, name: "Four-Drops", color: "green" }],
          },
          {
            title: "5",
            data: [{ count: 2, name: "Five-Drops", color: "green" }],
          },
          {
            title: "6+",
            data: [{ count: 1, name: "Six-Drops", color: "green" }],
          },
        ]}
      ></Graph>
    </View>
  );
}
