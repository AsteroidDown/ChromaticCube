import { View } from "react-native";
import { Bar, BarData } from "../bar/bar";
import { useEffect, useRef, useState } from "react";

export interface SetData {
  title: string;
  data: BarData[];
}

export interface GraphPlotProps {
  sets: SetData[];
  ceiling: number;
  yTickLength: number;
  stacked?: boolean;
}

export function GraphPlot({
  ceiling,
  yTickLength,
  sets,
  stacked = true,
}: GraphPlotProps) {
  const yTickCount = ceiling / yTickLength;

  const yTicks = Array(yTickCount+1)
    .fill(0)
    .map((_tick, index) => index * yTickLength);

  return (
    <View className="flex flex-row px-6 h-full border-b-background-600 border-b border-l-background-600 border-l min-w-fit">
      {
        <View className="justify-between absolute w-full h-full -ml-6">
          {yTicks.map((tick) => (
            <View
              key={tick}
              className="border-b border-background-300"
            ></View>
          ))}
        </View>
      }

      <View className="flex flex-row w-full justify-between">
        {sets.map((set, index) => (
          <View 
            key={set.title + index} 
            className="flex justify-end min-w-24 h-full items-center animate-bottomToTopGrow mt-auto"
            >
            <Bar data={set.data} ceiling={ceiling} stacked={stacked}></Bar>
          </View>
        ))}
      </View>
    </View>
  );
}
