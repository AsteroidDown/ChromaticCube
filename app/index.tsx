import React from "react";
import { View } from "react-native";
import { Bar, BarData } from "../components/graph/bar/bar";
import "../global.css";

export default function App() {
  const data: BarData[] = [
    { count: 2, name: "White", color: "white" },
    { count: 3, name: "Blue", color: "blue" },
    { count: 2, name: "Black", color: "black" },
    { count: 1, name: "Red", color: "red" },
    { count: 2, name: "Green", color: "green" },
  ];

  const data2: BarData[] = [
    { count: 3, name: "White", color: "white" },
    { count: 3, name: "Blue", color: "blue" },
    { count: 2, name: "Black", color: "black" },
    { count: 3, name: "Red", color: "red" },
    { count: 2, name: "Green", color: "green" },
  ];

  const data3: BarData[] = [
    { count: 4, name: "White", color: "white" },
    { count: 3, name: "Blue", color: "blue" },
    { count: 2, name: "Black", color: "black" },
    { count: 4, name: "Red", color: "red" },
    { count: 2, name: "Green", color: "green" },
  ];

  const data4: BarData[] = [
    { count: 3, name: "White", color: "white" },
    { count: 1, name: "Blue", color: "blue" },
    { count: 3, name: "Black", color: "black" },
    { count: 2, name: "Red", color: "red" },
    { count: 3, name: "Green", color: "green" },
  ];

  return (
    <View className="flex-1 items-center justify-center bg-black">
      <View className="flex flex-row gap-6">
        <Bar data={data} ceiling={15}></Bar>
        <Bar data={data2} ceiling={15}></Bar>
        <Bar data={data3} ceiling={15}></Bar>
        <Bar data={data4} ceiling={15}></Bar>
      </View>
    </View>
  );
}
