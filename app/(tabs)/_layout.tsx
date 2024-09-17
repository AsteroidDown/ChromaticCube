import {
  faClipboardQuestion,
  faCube,
  faLayerGroup,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function TabLayout() {
  return (
    <View className="flex flex-row w-full h-full bg-background-100">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "rgb(var(--background-200))",
          tabBarStyle: {
            backgroundColor: "var(--background-200)",
            borderColor: "var(--background-100}",
            borderTopColor: "var(--background-100}",
          },
          tabBarIconStyle: {
            display: "none",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Overview",
            tabBarLabel: ({ focused }) => (
              <View className="flex flex-row justify-center items-center gap-2">
                <FontAwesomeIcon
                  icon={faCube}
                  size={"lg"}
                  className={focused ? "color-white" : "color-primary-400"}
                />

                <Text className={focused ? "color-white" : "color-primary-400"}>
                  Overview
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="main-board"
          options={{
            tabBarLabel: ({ focused }) => (
              <View
                className={`flex flex-row justify-center items-center gap-2`}
              >
                <FontAwesomeIcon
                  icon={faLayerGroup}
                  size={"lg"}
                  className={
                    focused
                      ? "color-white rounded-t-lg w-full"
                      : "color-primary-400"
                  }
                />

                <Text
                  className={`whitespace-nowrap ${
                    focused ? "color-white" : "color-primary-400"
                  }`}
                >
                  Main Board
                </Text>
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="maybe-board"
          options={{
            tabBarLabel: ({ focused }) => (
              <View className="flex flex-row justify-center items-center gap-2">
                <FontAwesomeIcon
                  icon={faClipboardQuestion}
                  size={"lg"}
                  className={
                    focused
                      ? "color-white rounded-t-lg w-full"
                      : "color-primary-400"
                  }
                />

                <Text
                  className={`whitespace-nowrap ${
                    focused ? "color-white" : "color-primary-400"
                  }`}
                >
                  Maybe Board
                </Text>
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
