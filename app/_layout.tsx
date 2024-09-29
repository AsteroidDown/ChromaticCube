import Text from "@/components/ui/text/text";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import { getLocalStorageDashboard } from "@/functions/local-storage/dashboard-local-storage";
import "@/global.css";
import { Dashboard } from "@/models/dashboard/dashboard";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

export default function RootLayout() {
  const [dashboard, setDashboard] = React.useState(null as Dashboard | null);

  useEffect(() => setDashboard(getLocalStorageDashboard()), []);

  return (
    <View className="flex w-full h-full bg-background-100 ">
      <Text size="2xl" thickness="medium" className="px-6 py-4">
        Chromatic Cube
      </Text>

      <DashboardContext.Provider value={{ dashboard, setDashboard }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </DashboardContext.Provider>
    </View>
  );
}
