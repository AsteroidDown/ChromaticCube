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

  return (
    <View className="flex flex-row-reverse h-11">
      <View className="bg-background-200 rounded-l-full z-10">
        <Chip
          className="min-h-11"
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
        {filters.map((filter, index) => (
          <Filter
            key={filter.title + index}
            className={`flex-1 max-w-min min-w-min transition-all duration-300 ${
              showFilters ? "mr-[0%]" : "mr-[-20%]"
            }`}
            {...filter}
          />
        ))}
      </View>
    </View>
  );
}
