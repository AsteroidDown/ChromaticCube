import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactNode } from "react";
import { Text, View, ViewProps } from "react-native";
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
      <View className="flex flex-row flex-wrap justify-between items-center px-6 pb-4">
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
            <Text className="text-white font-bold text-2xl text-wrap">
              {title}
            </Text>
            <Text className="text-dark-600 text-sm">{subtitle}</Text>
          </View>

          {titleEnd}
        </View>

        {end && <View className="flex">{end}</View>}
      </View>

      {!hideDivider && <Divider thick />}
    </View>
  );
}
