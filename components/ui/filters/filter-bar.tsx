import { CardItemGalleryType } from "@/components/cards/card-item-gallery";
import CardSaveAsGraphModal from "@/components/cards/card-save-as-graph-modal";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import { SortDirection } from "@/constants/sorting";
import { CardFilters } from "@/models/sorted-cards/sorted-cards";
import {
  faFilter,
  faPlus,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { View } from "react-native";
import Chip from "../chip/chip";
import ColorFilter from "./filter-types/color-filter";
import RarityFilter from "./filter-types/rarity-filter";
import TypeFilter from "./filter-types/type-filter";
import SortingFilter from "./sorting-filter";

export interface FilterBarProps {
  type?: CardItemGalleryType;
  setFilters: React.Dispatch<React.SetStateAction<CardFilters>>;
}

export default function FilterBar({ setFilters, type }: FilterBarProps) {
  const [showFilters, setShowFilters] = React.useState(false);
  const [filterLength, setFilterLength] = React.useState(0);
  const [resetFilters, setResetFilters] = React.useState(false);

  const [colorFilter, setColorFilter] = React.useState([] as MTGColor[]);
  const [typeFilter, setTypeFilter] = React.useState([] as MTGCardTypes[]);
  const [rarityFilter, setRarityFilter] = React.useState([] as MTGRarity[]);

  const [priceSort, setPriceSort] = React.useState(null as SortDirection);
  const [manaValueSort, setManaValueSort] = React.useState(
    null as SortDirection
  );

  const [saveAsGraphOpen, setSaveAsGraphOpen] = React.useState(false);

  useEffect(() => {
    setFilters({
      colorFilter,
      typeFilter,
      rarityFilter,
      priceSort,
      manaValueSort,
    });

    setFilterLength(
      colorFilter.length + typeFilter.length + rarityFilter.length
    );
  }, [colorFilter, typeFilter, rarityFilter, manaValueSort, priceSort]);

  function clearFilters() {
    setColorFilter([]);
    setTypeFilter([]);
    setRarityFilter([]);
    setManaValueSort(null);
    setPriceSort(null);
    setResetFilters(!resetFilters);
  }

  return (
    <View className="flex flex-row-reverse">
      <View className="bg-background-200 rounded-l-full z-10">
        <Chip
          startIcon={faFilter}
          type={showFilters ? "default" : "outlined"}
          onClick={() => setShowFilters(!showFilters)}
        ></Chip>

        <View
          className={`${
            filterLength ? "max-w-[100px]" : "max-w-[0px]"
          } absolute -bottom-1 -right-1 overflow-hidden transition-all duration-300`}
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
        className={`flex flex-row gap-2 w-fit pr-4 rounded-full overflow-hidden transition-all duration-300 ${
          showFilters
            ? "mr-0 max-w-[100%] overflow-x-auto"
            : "-mr-12 max-w-[0%]"
        }`}
      >
        <CardSaveAsGraphModal
          open={saveAsGraphOpen}
          setOpen={setSaveAsGraphOpen}
        />

        <Chip
          type="outlined"
          startIcon={faPlus}
          onClick={() => setSaveAsGraphOpen(true)}
        />

        {(colorFilter?.length || typeFilter?.length || rarityFilter?.length) >
          0 && (
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
