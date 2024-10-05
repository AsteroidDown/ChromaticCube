import { titleCase } from "@/functions/text-manipulation";
import { View } from "react-native";
import Text from "../ui/text/text";

export interface ChartColumnHeadingProps {
  title: string;
  large?: boolean;
  double?: boolean;
  smallTitles?: boolean;
}

export default function ChartColumnHeading({
  title,
  large = false,
  double = false,
  smallTitles = false,
}: ChartColumnHeadingProps) {
  return (
    <View
      className={`flex-1 ${smallTitles ? "h-8" : large ? "h-[100px]" : "h-14"}`}
    >
      <View
        className={`${
          double ? "border-l-2" : "border-l"
        } absolute h-full -ml-px border-background-300 rotate-[12deg] origin-bottom-left`}
      ></View>

      <View className="absolute flex justify-end items-center w-full h-full left-[50%] translate-x-[-50%]">
        <Text
          noWrap
          className={`absolute w-full left-[50%] bottom-1 origin-bottom-left ${
            !smallTitles
              ? "rotate-[-78deg] md:translate-x-[7%] translate-x-[25%]"
              : ""
          }`}
        >
          {smallTitles ? titleCase(title.substring(0, 1)) : title}
        </Text>
      </View>
    </View>
  );
}
