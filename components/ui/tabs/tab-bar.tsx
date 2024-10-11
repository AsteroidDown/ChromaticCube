import { Link, Stack } from "expo-router";
import React from "react";
import { Linking, View, ViewProps } from "react-native";
import Tab, { TabProps } from "./tab";

export type TabBarProps = ViewProps & {
  tabs: TabProps[];
};

export default function TabBar({ tabs, className, children }: TabBarProps) {
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [focusedIndex, setFocusedIndex] = React.useState(0);

  Linking.getInitialURL().then((url) => {
    if (!firstLoad) return;

    tabs.forEach((tab, index) => {
      if (url?.includes(tab.name)) {
        setFirstLoad(false);
        setFocusedIndex(index);
      }
    });
  });

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
              // router.replace(tab.link);
              setFocusedIndex(index);
            }}
          >
            <Tab
              {...tab}
              index={index}
              focusedIndex={focusedIndex}
              focused={index === focusedIndex}
            />
          </Link>
        ))}

        <View className="ml-auto">{children}</View>
      </View>

      <Stack screenOptions={{ headerShown: false }}>
        {tabs.map((tab, index) => (
          <Stack.Screen key={tab.title + index} name={tab.link?.toString()} />
        ))}
      </Stack>
    </View>
  );
}
