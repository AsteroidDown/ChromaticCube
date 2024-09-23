import Text from "@/components/ui/text/text";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { View, ViewProps } from "react-native";
import Divider from "../divider/divider";

export type BoxHeaderProps = ViewProps & {
  title: string;
  subtitle?: string;

  start?: ReactNode;
  startIcon?: IconProp;
  titleEnd?: ReactNode;
  end?: ReactNode;

  hideDivider?: boolean;
};

export default function BoxHeader({
  title,
  subtitle,
  start,
  startIcon,
  titleEnd,
  end,
  hideDivider = false,
}: BoxHeaderProps) {
  return (
    <View className="flex-1 -mx-6">
      <View className="flex flex-row flex-wrap gap-2 justify-between items-center px-6 pb-4">
        <View className="flex flex-row items-center gap-4">
          {start}
          {startIcon && (
            <FontAwesomeIcon
              size="2xl"
              icon={startIcon}
              className="text-white"
            />
          )}

          <View className="flex flex-1">
            <Text size="2xl" thickness="bold">
              {title}
            </Text>

            <Text className="text-dark-600">{subtitle}</Text>
          </View>

          {titleEnd}
        </View>

        {end && <View className="flex">{end}</View>}
      </View>

      {!hideDivider && <Divider thick />}
    </View>
  );
}
