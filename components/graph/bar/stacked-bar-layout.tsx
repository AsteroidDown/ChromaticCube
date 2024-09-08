import { DimensionValue, View } from "react-native";
import { MTGColor } from "../../../constants/mtg-colors";
import { Tooltip } from "../../ui/tooltip/tooltip";
import { BarData } from "./bar";

interface StackedBarLayoutProps {
  data: BarData[];
  total: number;
  topHeight: DimensionValue;
  barHeight: DimensionValue;
}

export function StackedBarLayout({
  data,
  total,
  topHeight,
  barHeight,
}: StackedBarLayoutProps) {
  const landHeight = getStackHeight("land", total, data);
  const colorlessHeight = getStackHeight("colorless", total, data, landHeight);
  const goldHeight = getStackHeight("gold", total, data, colorlessHeight);
  const greenHeight = getStackHeight("green", total, data, goldHeight);
  const redHeight = getStackHeight("red", total, data, greenHeight);
  const blackHeight = getStackHeight("black", total, data, redHeight);
  const blueHeight = getStackHeight("blue", total, data, blackHeight);
  const whiteHeight = getStackHeight("white", total, data, blueHeight);

  const baseClass =
    "absolute bottom-0 w-full h-full rounded-t-lg bg-gradient-to-t";

  return (
    <View className="flex w-10 h-56 border-white">
      <View style={[{ height: topHeight }]}></View>

      <View className="flex w-full" style={[{ height: barHeight }]}>
        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${whiteHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "white")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "white")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-white from-mtg-white-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${blueHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "blue")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "blue")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-blue from-mtg-blue-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${blackHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "black")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "black")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-black from-mtg-black-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${redHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "red")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "red")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-red from-mtg-red-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${greenHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "green")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "green")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-green from-mtg-green-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${goldHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "gold")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "gold")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-gold from-mtg-gold-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: "100%" },
            { position: "absolute" },
            { height: `${colorlessHeight}%` },
          ]}
          title={data.find((entry) => entry.color === "colorless")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "colorless")?.count || 0)
          }
        >
          <View
            className={`${baseClass} to-mtg-colorless from-mtg-colorless-secondary`}
          ></View>

          <Tooltip
            style={[
              { bottom: 0 },
              { width: "100%" },
              { position: "absolute" },
              { height: `${landHeight}%` },
            ]}
            title={data.find((entry) => entry.color === "land")?.name}
            message={
              "Count: " +
              (data.find((entry) => entry.color === "land")?.count || 0)
            }
          >
            <View
              className={`${baseClass} to-mtg-land from-mtg-land-secondary`}
            ></View>
          </Tooltip>
        </Tooltip>
      </View>
    </View>
  );
}

function getStackHeight(
  color: MTGColor,
  total: number,
  data: BarData[],
  previousValue?: number
) {
  return (
    ((data.find((entry) => entry.color === color)?.count || 0) / total) * 100 +
    (previousValue || 0)
  );
}
