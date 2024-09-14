import { Link, Stack } from "expo-router";
import React from "react";
import { View, ViewProps } from "react-native";
import Tab, { TabProps } from "./tab";

export type TabBarProps = ViewProps & {
  tabs: TabProps[];
};

export default function TabBar({ tabs, className }: TabBarProps) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  return (
    <View className={`${className} flex mb-4`}>
      <View
        className={`flex flex-1 flex-row w-full min-h-[46px] max-h-[46px] -mb-[2px] pl-[2px] overflow-x-auto overflow-y-hidden`}
      >
        {tabs.map((tab, index) => (
          <Link
            key={tab.title + index}
            href={tab.link}
            onPress={() => {
              setFocusedIndex(index);
            }}
          >
            <Tab
              {...tab}
              index={index}
              focused={index === focusedIndex}
              focusedIndex={focusedIndex}
            />
          </Link>
        ))}
      </View>

      {/* <View
        className={`flex flex-1 w-full rounded-b-xl rounded-tr-xl border-2 border-primary-200 overflow-hidden`}
      > */}
      <Stack screenOptions={{ headerShown: false }}>
        {tabs.map((tab, index) => (
          <Stack.Screen key={tab.title + index} name={tab.link?.toString()} />
        ))}
      </Stack>
    </View>
    // </View>
  );
}
