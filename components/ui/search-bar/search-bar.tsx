import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Box from "../box/box";

export interface SearchBarProps {
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
  searchAction: () => void;
}

const baseClasses =
  "relative flex flex-row gap-3 items-center !px-6 !py-4 w-full rounded-full color-background-500 transition-all";
const hoverClasses =
  "hover:-m-[2px] hover:border-2 hover:border-background-500 focus:border-background-500";

export default function SearchBar({
  search,
  onSearchChange,
  searchAction,
}: SearchBarProps) {
  return (
    <View className="mx-px w-full">
      <Box classes={`${baseClasses} ${hoverClasses}`}>
        <FontAwesomeIcon className="color-white" icon={faSearch} />

        <TextInput
          placeholder="Find a Card"
          placeholderTextColor="#8b8b8b"
          className="flex-1 h-10 -my-4 color-white outline-none text-base"
          value={search}
          onChangeText={onSearchChange}
          onKeyPress={(event) =>
            (event as any)?.code === "Enter" ? searchAction() : null
          }
        />

        <Pressable
          onPress={searchAction}
          className="rounded-full hover:bg-background-100 px-4 py-2 -mx-3 -my-2 transition-all"
        >
          <Text className="text-base font-medium text-white">Search</Text>
        </Pressable>
      </Box>
    </View>
  );
}
