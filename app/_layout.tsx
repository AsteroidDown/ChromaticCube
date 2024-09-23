import Text from "@/components/ui/text/text";
import "@/global.css";
import { Stack } from "expo-router";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <View className="flex w-full h-full bg-background-100 ">
      <Text size="2xl" thickness="medium" className="px-6 py-4">
        Chromatic Cube
      </Text>

      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </View>
  );
}
