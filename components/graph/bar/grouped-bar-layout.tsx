import { Tooltip } from "@/components/ui/tooltip/tooltip";
import { MTGColor, MTGColors } from "@/constants/mtg/mtg-colors";
import { View } from "react-native";
import { BarData } from "./bar";

interface GroupedBarLayoutProps {
  data: BarData[];
  ceiling: number;
}

export function GroupedBarLayout({ data, ceiling }: GroupedBarLayoutProps) {
  const whiteHeight = getStackHeight(MTGColors.WHITE, ceiling, data);
  const blueHeight = getStackHeight(MTGColors.BLUE, ceiling, data);
  const blackHeight = getStackHeight(MTGColors.BLACK, ceiling, data);
  const redHeight = getStackHeight(MTGColors.RED, ceiling, data);
  const greenHeight = getStackHeight(MTGColors.GREEN, ceiling, data);
  const landHeight = getStackHeight(MTGColors.LAND, ceiling, data);
  const colorlessHeight = getStackHeight(MTGColors.COLORLESS, ceiling, data);
  const goldHeight = getStackHeight(MTGColors.GOLD, ceiling, data);

  const baseClasses = "w-full rounded-t-lg bg-gradient-to-t";
  const containerClasses = "flex h-full flex-1";

  return (
    <View className="flex flex-row gap-1 justify-center w-full h-full px-2">
      <View className={containerClasses}>
        <View style={[{ height: `${100 - whiteHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.WHITE)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.WHITE)?.count || 0)
          }
          style={[{ height: `${whiteHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-white from-mtg-white-secondary`}
          ></View>
        </Tooltip>
      </View>

      <View className={containerClasses}>
        <View style={[{ height: `${100 - blueHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.BLUE)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.BLUE)?.count || 0)
          }
          style={[{ height: `${blueHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-blue from-mtg-blue-secondary`}
          ></View>
        </Tooltip>
      </View>

      <View className={containerClasses}>
        <View style={[{ height: `${100 - blackHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.BLACK)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.BLACK)?.count || 0)
          }
          style={[{ height: `${blackHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-black from-mtg-black-secondary`}
          ></View>
        </Tooltip>
      </View>

      <View className={containerClasses}>
        <View style={[{ height: `${100 - redHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.RED)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.RED)?.count || 0)
          }
          style={[{ height: `${redHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-red from-mtg-red-secondary`}
          ></View>
        </Tooltip>
      </View>

      <View className={containerClasses}>
        <View style={[{ height: `${100 - greenHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.GREEN)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.GREEN)?.count || 0)
          }
          style={[{ height: `${greenHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-green from-mtg-green-secondary`}
          ></View>
        </Tooltip>
      </View>

      <View className={containerClasses}>
        <View style={[{ height: `${100 - goldHeight}%` }]}></View>

        <Tooltip
          title={data.find((entry) => entry.color === MTGColors.GOLD)?.name}
          message={
            "Count: " +
            (data.find((entry) => entry.color === MTGColors.GOLD)?.count || 0)
          }
          style={[{ height: `${goldHeight}%` }]}
        >
          <View
            className={`${baseClasses} h-full to-mtg-gold from-mtg-gold-secondary`}
          ></View>
        </Tooltip>

        <View className={containerClasses}>
          <View style={[{ height: `${100 - colorlessHeight}%` }]}></View>

          <Tooltip
            title={
              data.find((entry) => entry.color === MTGColors.COLORLESS)?.name
            }
            message={
              "Count: " +
              (data.find((entry) => entry.color === MTGColors.COLORLESS)
                ?.count || 0)
            }
            style={[{ height: `${colorlessHeight}%` }]}
          >
            <View
              className={`${baseClasses} h-full to-mtg-colorless from-mtg-colorless-secondary`}
            ></View>
          </Tooltip>
        </View>

        <View className={containerClasses}>
          <View style={[{ height: `${100 - landHeight}%` }]}></View>

          <Tooltip
            title={data.find((entry) => entry.color === MTGColors.LAND)?.name}
            message={
              "Count: " +
              (data.find((entry) => entry.color === MTGColors.LAND)?.count || 0)
            }
            style={[{ height: `${landHeight}%` }]}
          >
            <View
              className={`${baseClasses} h-full to-mtg-land from-mtg-land-secondary`}
            ></View>
          </Tooltip>
        </View>
      </View>
    </View>
  );
}

function getStackHeight(color: MTGColor, ceiling: number, data: BarData[]) {
  return (
    ((data.find((entry) => entry.color === color)?.count || 0) / ceiling) * 100
  );
}
