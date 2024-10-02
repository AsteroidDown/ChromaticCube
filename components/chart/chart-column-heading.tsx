import { DashboardItemSize } from "@/models/dashboard/dashboard";
import { View } from "react-native";
import Text from "../ui/text/text";

export interface ChartColumnHeadingProps {
  title: string;
  size: DashboardItemSize;
  double?: boolean;
}

export default function ChartColumnHeading({
  title,
  size,
  double = false,
}: ChartColumnHeadingProps) {
  const left =
    size === "sm" ? "left-[80%]" : size === "md" ? "left-[65%]" : "left-[58%]";

  return (
    <View className="flex-1 h-14">
      <View
        className={`${
          double ? "border-l-2" : "border-l"
        } absolute h-full -ml-px border-background-300 rotate-[12deg] origin-bottom-left`}
      ></View>

      <Text
        className={`${left} absolute bottom-0 mb-1 right-auto rotate-[-78deg] origin-bottom-left`}
      >
        {title}
      </Text>
    </View>
  );
}
