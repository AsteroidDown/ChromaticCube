import CardSaveAsGraphModal from "@/components/cards/card-save-as-graph-modal";
import Button from "@/components/ui/button/button";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import { SortDirection } from "@/constants/sorting";
import BoardContext from "@/contexts/cards/board.context";
import CardPreferencesContext from "@/contexts/cards/card-preferences.context";
import {
  getLocalStoragePreferences,
  setLocalStoragePreferences,
} from "@/functions/local-storage/preferences-local-storage";
import {
  CardFilters,
  CardFilterSortType,
} from "@/models/sorted-cards/sorted-cards";
import {
  faFilter,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Chip from "../chip/chip";
import ColorFilter from "./filter-types/color-filter";
import RarityFilter from "./filter-types/rarity-filter";
import TypeFilter from "./filter-types/type-filter";
import SortingFilter from "./sorting-filter";

export interface FilterBarProps {
  type: CardFilterSortType;
  setFilters: React.Dispatch<React.SetStateAction<CardFilters>>;
}

export default function FilterBar({ setFilters, type }: FilterBarProps) {
  const { board } = useContext(BoardContext);
  const { preferences, setPreferences } = useContext(CardPreferencesContext);

  const [showFilters, setShowFilters] = React.useState(false);
  const [filterLength, setFilterLength] = React.useState(0);
  const [resetFilters, setResetFilters] = React.useState(false);

  const [colorFilter, setColorFilter] = React.useState(
    undefined as MTGColor[] | undefined
  );
  const [typeFilter, setTypeFilter] = React.useState(
    undefined as MTGCardTypes[] | undefined
  );
  const [rarityFilter, setRarityFilter] = React.useState(
    undefined as MTGRarity[] | undefined
  );

  const [priceSort, setPriceSort] = React.useState(null as SortDirection);
  const [manaValueSort, setManaValueSort] = React.useState(
    null as SortDirection
  );

  const [saveAsGraphOpen, setSaveAsGraphOpen] = React.useState(false);

  useEffect(() => {
    const filters: CardFilters = {
      colorFilter,
      typeFilter,
      rarityFilter,
      priceSort,
      manaValueSort,
    };
    setFilters(filters);

    const filterLength =
      (colorFilter?.length || 0) +
      (typeFilter?.length || 0) +
      (rarityFilter?.length || 0);
    setFilterLength(filterLength);

    if (filterLength) {
      setLocalStoragePreferences({ filters });
      setPreferences(getLocalStoragePreferences() || {});
    }
  }, [colorFilter, typeFilter, rarityFilter, manaValueSort, priceSort]);

  function clearFilters() {
    setColorFilter([]);
    setTypeFilter([]);
    setRarityFilter([]);
    setManaValueSort(null);
    setPriceSort(null);
    setResetFilters(!resetFilters);
    setLocalStoragePreferences({
      filters: { colorFilter: [], typeFilter: [], rarityFilter: [] },
    });
  }

  return (
    <View
      className={`flex flex-row-reverse transition-all duration-300 ${
        showFilters ? "max-w-[1000px]" : "max-w-[8px]"
      }`}
    >
      <View className="bg-background-200 rounded-l-full z-10">
        <Button
          rounded
          icon={faFilter}
          type={showFilters ? "default" : "clear"}
          onClick={() => setShowFilters(!showFilters)}
        ></Button>

        <View
          className={`${
            filterLength ? "max-w-[100px]" : "max-w-[0px]"
          } absolute -bottom-1.5 -right-1.5 overflow-hidden transition-all duration-300`}
        >
          <Text
            thickness="bold"
            className={`!text-dark-100 bg-primary-200 py-px px-[7px] rounded-full`}
          >
            {filterLength}
          </Text>
        </View>
      </View>

      <View
        className={`flex flex-row gap-2 w-fit rounded-full overflow-hidden transition-all duration-300 ${
          showFilters ? "mr-4 max-w-[100%] overflow-x-auto" : "-mr-8 max-w-[0%]"
        }`}
      >
        {board === "main" && (
          <>
            <CardSaveAsGraphModal
              type={type}
              open={saveAsGraphOpen}
              setOpen={setSaveAsGraphOpen}
            />

            <Chip
              type="outlined"
              startIcon={faPlus}
              onClick={() => setSaveAsGraphOpen(true)}
            />
          </>
        )}

        {filterLength > 0 && (
          <Chip
            type="outlined"
            startIcon={faRotateRight}
            onClick={() => clearFilters()}
          />
        )}

        {type !== "color" && (
          <ColorFilter setColorFilters={setColorFilter} reset={resetFilters} />
        )}

        {type !== "type" && (
          <TypeFilter setTypeFilters={setTypeFilter} reset={resetFilters} />
        )}

        <RarityFilter setRarityFilters={setRarityFilter} reset={resetFilters} />

        {type !== "cost" && (
          <SortingFilter
            title="Mana Value"
            reset={resetFilters}
            sortDirection={manaValueSort}
            setSortDirection={setManaValueSort}
          />
        )}

        <SortingFilter
          title="Price"
          reset={resetFilters}
          sortDirection={priceSort}
          setSortDirection={setPriceSort}
        />
      </View>
    </View>
  );
}
