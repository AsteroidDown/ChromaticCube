import { Preferences } from "@/models/preferences/preferences";
import { Platform } from "react-native";

export function getLocalStoragePreferences(): Preferences | null {
  if (Platform.OS === "ios") return null;

  const preferences: Preferences = JSON.parse(
    localStorage.getItem("preferences") || "{}"
  );

  return preferences;
}

export function setLocalStoragePreferences(preferences: Preferences) {
  let storedPreferences = getLocalStoragePreferences();

  if (!storedPreferences?.filters) {
    localStorage.setItem(
      "preferences",
      JSON.stringify({
        filters: preferences.filters || [],
        cardsCondensed: preferences.cardsCondensed || false,
        hideCardImages: preferences.hideCardImages || false,
      })
    );

    return;
  }

  if (preferences.filters !== undefined) {
    storedPreferences.filters = preferences.filters;
  }
  if (preferences.cardsCondensed !== undefined) {
    storedPreferences.cardsCondensed = preferences.cardsCondensed;
  }
  if (preferences.hideCardImages !== undefined) {
    storedPreferences.hideCardImages = preferences.hideCardImages;
  }

  return localStorage.setItem("preferences", JSON.stringify(storedPreferences));
}
