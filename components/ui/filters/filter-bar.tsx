import { faFilter } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { View } from "react-native";
import Chip from "../chip/chip";
import Filter, { FilterProps } from "./filter";

export interface FilterBarProps {
  filters: FilterProps[];
}

export default function FilterBar({ filters }: FilterBarProps) {
  const [showFilters, setShowFilters] = React.useState(false);

  const filtersLength = filters.length;

  return (
    <View className="flex flex-row">
      <View className="z-10 bg-background-200 rounded-r-full">
        <Chip
          startIcon={faFilter}
          type={showFilters ? "default" : "outlined"}
          onClick={() => setShowFilters(!showFilters)}
        ></Chip>
      </View>

      <View
        className={`flex flex-row gap-2 w-fit pl-4 rounded-full overflow-hidden transition-all duration-300 ${
          showFilters ? "ml-0 max-w-[85%] overflow-x-auto" : "-ml-12 max-w-[0%]"
        }`}
      >
        {filters.map((filter, index) => (
          <Filter
            key={filter.text + index}
            className={`flex-1 max-w-min min-w-min transition-all duration-300 ${
              showFilters ? "ml-[0%]" : "ml-[-20%]"
            }`}
            {...filter}
          />
        ))}
      </View>
    </View>
  );
}
