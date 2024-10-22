import Text from "@/components/ui/text/text";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import { getLocalStorageDashboard } from "@/functions/local-storage/dashboard-local-storage";
import "@/global.css";
import { Card } from "@/models/card/card";
import { Dashboard } from "@/models/dashboard/dashboard";
import { Stack } from "expo-router";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";

export default function RootLayout() {
  const [storedCards, setStoredCards] = React.useState([] as Card[]);

  const [dashboard, setDashboard] = React.useState(null as Dashboard | null);

  useEffect(() => {
    setDashboard(getLocalStorageDashboard());
    setStoredCards(getLocalStorageStoredCards());
  }, []);

  return (
    <SafeAreaView className="flex w-full h-full bg-background-100">
      <Text size="2xl" thickness="medium" className="px-6 py-4">
        Chromatic Cube
      </Text>

      <StoredCardsContext.Provider value={{ storedCards, setStoredCards }}>
        <DashboardContext.Provider value={{ dashboard, setDashboard }}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </DashboardContext.Provider>
      </StoredCardsContext.Provider>
    </SafeAreaView>
  );
}
