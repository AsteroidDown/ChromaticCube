import { Preferences } from "@/models/preferences/preferences";
import { createContext } from "react";

const CardPreferencesContext = createContext({
  preferences: {} as Preferences,
  setPreferences: (preferences: Preferences) => {},
});

export default CardPreferencesContext;
