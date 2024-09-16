import { DimensionValue, View } from "react-native";
import { MTGColor } from "../../../constants/mtg/mtg-colors";
import { Tooltip } from "../../ui/tooltip/tooltip";
import { BarData } from "./bar";

interface StackedBarLayoutProps {
  data: BarData[];
  total: number;
  topHeight: DimensionValue;
  barHeight: DimensionValue;
  className?: string;
  barStyle: string;
  barsVertical: boolean;
}

export function StackedBarLayout({
  data,
  total,
  topHeight,
  barHeight,
  className,
  barStyle,
  barsVertical,
}: StackedBarLayoutProps) {
  // is there a way to do this dynamically? Attempted a few method but couldn't find a solution because of dynamic class name limitations with Tailwind: https://stackoverflow.com/questions/69687530/dynamically-build-classnames-in-tailwindcss
  const landHeight = getStackHeight(MTGColor.LAND, total, data);
  const colorlessHeight = getStackHeight(MTGColor.COLORLESS, total, data, landHeight);
  const goldHeight = getStackHeight(MTGColor.GOLD, total, data, colorlessHeight);
  const greenHeight = getStackHeight(MTGColor.GREEN, total, data, goldHeight);
  const redHeight = getStackHeight(MTGColor.RED, total, data, greenHeight);
  const blackHeight = getStackHeight(MTGColor.BLACK, total, data, redHeight);
  const blueHeight = getStackHeight(MTGColor.BLUE, total, data, blackHeight);
  const whiteHeight = getStackHeight(MTGColor.WHITE, total, data, blueHeight);
  const barContainerHeightStyle = barsVertical
    ? { height: barHeight }
    : { width: barHeight };

  return (
    <View className={"flex border-white " + className ?? ""}>

      <View className="flex w-full h-full" style={[barContainerHeightStyle]}>
        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${whiteHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${whiteHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "white")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "white")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-white from-mtg-white-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${blueHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${blueHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "blue")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "blue")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-blue from-mtg-blue-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${blackHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${blackHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "black")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "black")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-black from-mtg-black-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${redHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${redHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "red")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "red")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-red from-mtg-red-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${greenHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${greenHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "green")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "green")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-green from-mtg-green-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${goldHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${goldHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "gold")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "gold")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-gold from-mtg-gold-secondary`}
          ></View>
        </Tooltip>

        <Tooltip
          style={[
            { bottom: 0 },
            { width: barsVertical ? "100%" : `${colorlessHeight}%`},
            { position: "absolute" },
            { height: barsVertical ? `${colorlessHeight}%`: "100%" },
          ]}
          title={data.find((entry) => entry.color === "colorless")?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === "colorless")?.count || 0)
          }
        >
          <View
            className={`${barStyle} to-mtg-colorless from-mtg-colorless-secondary`}
          ></View>

          <Tooltip
            style={[
              { bottom: 0 },
              { width: barsVertical ? "100%" : `${landHeight}%`},
              { position: "absolute" },
              { height: barsVertical ? `${landHeight}%`: "100%" },
            ]}
            title={data.find((entry) => entry.color === "land")?.name}
            message={
              "Count: " +
              (data.find((entry) => entry.color === "land")?.count || 0)
            }
          >
            <View
              className={`${barStyle} to-mtg-land from-mtg-land-secondary`}
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
