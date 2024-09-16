import { Text, View, ViewProps } from "react-native";
import { GraphPlot, SetData } from "./layout/graph-plot";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartBar, faChartColumn } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import { GraphAxis } from "./layout/graph-axis";

export type GraphProps = ViewProps & {
  title?: string;
  horizontalTitle?: string;
  verticalTitle?: string;
  sets: SetData[];
  stacked?: boolean;
  barsVertical?: boolean;
};

export function Graph({
  title,
  sets,
  verticalTitle,
  horizontalTitle,
  stacked = true,
}: GraphProps) {
  const [hovered, setHovered] = useState(false);
  const [barsVertical, setBarsVertical] = useState(true);

  const tickLengthThresholdChange: number = 10; // make this a list of thresholds so tick intervals grow proportionally to graph height ??

  const graphCeiling: number = computeGraphCeiling(
    sets,
    stacked,
    tickLengthThresholdChange
  );
  const verticalLabels: string[] = computeVerticalTickLabels(
    graphCeiling,
    tickLengthThresholdChange
  );
  const horizontalLabels: string[] = sets.map((set: SetData) => set.title);

  return (
    <View className="flex flex-auto">
      {/* Title */}
      <View className="justify-center flex-1">
        <Text className="text-white font-bold text-xl w-full text-center p-6">
          {title}
        </Text>

        {/* Bar direction switcher */}
        <View
          onPointerEnter={() => {
            setHovered(true);
          }}
          onPointerLeave={() => {
            setHovered(false);
          }}
          className={`absolute right-2 h-full justify-center flex`}
        >
          <FontAwesomeIcon
            className={`${
              (hovered && !barsVertical) || (!hovered && barsVertical)
                ? "opacity-1 cursor-pointer"
                : "hidden"
            } absolute right-2 justify-center`}
            icon={faChartColumn}
            size={"lg"}
            color="white"
            onClick={() => {
              setBarsVertical(true);
            }}
          />
          <FontAwesomeIcon
            className={`${
              (hovered && barsVertical) || (!hovered && !barsVertical)
                ? "opacity-1 cursor-pointer"
                : "hidden"
            } absolute right-2 justify-center`}
            icon={faChartBar}
            size={"lg"}
            color="white"
            onClick={() => {
              setBarsVertical(false);
            }}
          />
        </View>
      </View>

      {/* Plot and  vertical axis */}
      <View
        className={`flex flex-row gap-2 ${barsVertical ? "h-80" : "w-96 h-80"}`}
      >
        <View className="flex flex-row h-full justify-end">
          <GraphAxis
            title={barsVertical ? verticalTitle : horizontalTitle}
            labels={barsVertical ? verticalLabels : horizontalLabels}
            vertical={true}
            isNumCardsLabels={barsVertical}
          ></GraphAxis>
        </View>
        <View className="flex-1 transition ease-in">
          <GraphPlot
            sets={sets}
            ceiling={graphCeiling}
            stacked={stacked}
            numVerticalTicks={verticalLabels.length}
            barsVertical={barsVertical}
          ></GraphPlot>
        </View>
      </View>

      {/* Horizontal axis */}
      <View className="flex flex-row pt-2 pb-4">
          <View className="flex flex-row justify-end h-0 opacity-0">
          <GraphAxis
            title={barsVertical ? verticalTitle : horizontalTitle}
            labels={barsVertical ? verticalLabels : horizontalLabels}
            vertical={true}
            isNumCardsLabels={true}
          ></GraphAxis>
        </View>
        <View className="flex-1 ml-2">
          <GraphAxis
            title={barsVertical ? horizontalTitle : verticalTitle}
            labels={barsVertical ? horizontalLabels : verticalLabels.reverse()}
            vertical={false}
            isNumCardsLabels={!barsVertical}
          ></GraphAxis>
        </View>
      </View>
    </View>
  );
}
export { SetData };

/**
 * Computes the ceiling of a bar graph as a number representing the max number of cards that can be shown in the graph.
 * @param cardSets the sets of cards being shown in the graph
 * @param stacked whether the graph is in the stacked view or not
 * @param tickLengthThresholdChange value indicating when to change the visual interval scale of the graph
 * @returns
 */
function computeGraphCeiling(
  cardSets: SetData[],
  stacked: boolean,
  tickLengthThresholdChange: number
): number {
  // stacked max is the height of all bars in a set, non-stacked max is the max height in each set
  const maxValue = cardSets.reduce((acc, set) => {
    const setMaxValue = stacked
      ? set.data.reduce((acc, entry) => acc + entry.count, 0)
      : set.data.reduce(
          (acc, entry) => (entry && entry.count > acc ? entry.count : acc),
          0
        );

    return setMaxValue > acc ? setMaxValue : acc;
  }, 0);

  let ceiling: number;
  let tickLength: number;

  if (maxValue > tickLengthThresholdChange) {
    tickLength = 5;
    ceiling = Math.ceil(maxValue / tickLength) * tickLength;
  } else {
    tickLength = 2;
    ceiling = Math.ceil(maxValue / tickLength) * tickLength;
  }

  if (maxValue % tickLength == 0) {
    ceiling += tickLength;
  }

  return ceiling;
}

/**
 * Computes an array of vertical tick labels based on the cardSets to be rendered on the plot.
 * @param cardSets the sets of card information to be rendered in the plot
 * @param stacked true if the bar graph is a stacked plot, false otherwise
 *
 * @return a list of vertical tick labels
 */
function computeVerticalTickLabels(
  ceiling: number,
  tickLengthThresholdChange: number
): string[] {
  const verticalTickLength = ceiling > tickLengthThresholdChange ? 5 : 2;
  const verticalTickCount = ceiling / verticalTickLength;

  const verticalTicks = Array(verticalTickCount + 1)
    .fill(0)
    .map((_tick, index) => index * verticalTickLength);

  verticalTicks.reverse();

  return verticalTicks.map((verticalTick) => verticalTick.toString());
}
