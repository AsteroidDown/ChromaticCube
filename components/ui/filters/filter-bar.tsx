import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { View } from "react-native";
import { MTGColor } from "../../../constants/mtg/mtg-colors";
import { MTGRarity } from "../../../constants/mtg/mtg-rarity";
import { MTGCardTypes } from "../../../constants/mtg/mtg-types";
import { CardFilters } from "../../../models/sorted-cards/sorted-cards";
import Chip from "../chip/chip";
import ColorFilter from "./filter-types/color-filter";
import RarityFilter from "./filter-types/rarity-filter";
import TypeFilter from "./filter-types/type-filter";

export interface FilterBarProps {
  setFilters: React.Dispatch<React.SetStateAction<CardFilters>>;
}

export default function FilterBar({ setFilters }: FilterBarProps) {
  const [showFilters, setShowFilters] = React.useState(false);

  const [colorFilters, setColorFilters] = React.useState([] as MTGColor[]);
  const [typeFilters, setTypeFilters] = React.useState([] as MTGCardTypes[]);
  const [rarityFilters, setRarityFilters] = React.useState([] as MTGRarity[]);

  useEffect(() => {
    setFilters({
      color: colorFilters,
      type: typeFilters,
      rarity: rarityFilters,
    });
  }, [colorFilters, typeFilters, rarityFilters]);

  return (
    <View className="flex flex-row-reverse">
      <View className="bg-background-200 rounded-l-full z-10">
        <Chip
          startIcon={faFilter}
          type={showFilters ? "default" : "outlined"}
          onClick={() => setShowFilters(!showFilters)}
        ></Chip>
      </View>

      <View
        className={`flex flex-row gap-2 w-fit pr-4 rounded-full overflow-hidden transition-all duration-300 ${
          showFilters
            ? "mr-0 max-w-[100%] overflow-x-auto"
            : "-mr-12 max-w-[0%]"
        }`}
      >
        <ColorFilter setColorFilters={setColorFilters} />

        <TypeFilter setTypeFilters={setTypeFilters} />

        <RarityFilter setRarityFilters={setRarityFilters} />
      </View>
    </View>
  );
}
