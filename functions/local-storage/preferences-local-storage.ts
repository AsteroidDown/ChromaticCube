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
  localStorage.setItem("preferences", JSON.stringify(preferences));
}
