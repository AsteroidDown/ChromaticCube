import { Navigator } from "expo-router";
import React from "react";
import { Pressable, View, ViewProps } from "react-native";
import Tab, { TabProps } from "./tab";

export type TabBarProps = ViewProps & {
  tabs: TabProps[];
};

export default function TabBar({ tabs, className }: TabBarProps) {
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [selectedTab, setSelectedTab] = React.useState(tabs[0]);

  return (
    <View className="flex">
      <View
        className={`${className} flex flex-row max-w-full -mb-[2px] pl-[2px] overflow-x-auto overflow-y-hidden`}
      >
        {tabs.map((tab, index) => (
          <Pressable
            key={tab.title + index}
            onPress={() => setFocusedIndex(index)}
          >
            <Tab
              {...tab}
              index={index}
              focused={index === focusedIndex}
              focusedIndex={focusedIndex}
            />
          </Pressable>
        ))}
      </View>

      <View
        className={`w-full h-40 rounded-b-xl rounded-tr-xl border-2 border-primary-200 bg-background-100`}
      >
        <Navigator>
          {tabs.map((tab, index) => (
            <Navigator.Screen
              key={tab.title + index}
              name={tab.link}
              options={{ title: "Test" }}
            />
          ))}
        </Navigator>
      </View>
    </View>
  );
}
