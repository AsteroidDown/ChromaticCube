import { Href } from "expo-router";
import React from "react";
import { Text, View, ViewProps } from "react-native";

export type TabProps = ViewProps & {
  title: string;
  link: Href;
  name: string;
  index?: number;
  focused?: boolean;
  focusedIndex?: number;
};

export default function Tab({
  title,
  index,
  focusedIndex,
  focused = false,
  className,
}: TabProps) {
  const baseClasses =
    "px-8 py-2 -ml-[2px] rounded-t-xl border-t-2 border-x-2 transition-all duration-300";

  const focusedClasses =
    "border-background-200 bg-background-200 hover:bg-primary-300 hover:bg-opacity-30";
  const unfocusedClasses =
    "border-b-2 border-t-background-200 border-x-background-200 border-b-primary-200 bg-opacity-0 hover:bg-opacity-50 bg-primary-200";

  return (
    <View
      style={{ zIndex: index === focusedIndex ? 2 : 1 }}
      className={`${className} ${baseClasses} ${
        focused ? focusedClasses : unfocusedClasses
      }`}
    >
      <Text
        className={`${
          focused ? "text-primary-200" : "text-background-400"
        } font-semibold text-lg`}
      >
        {title}
      </Text>
    </View>
  );
}
