import "@/global.css";
import { Stack } from "expo-router";
import { Text, View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex w-full h-full bg-background-100 ">
      <Text className="text-white font-medium text-2xl px-6 py-4">
        Chromatic Cube
      </Text>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}
