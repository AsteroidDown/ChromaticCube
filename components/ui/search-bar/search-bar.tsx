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

export default function SearchBar({
  search,
  onSearchChange,
  searchAction,
}: SearchBarProps) {
  const [searchHovered, setSearchHovered] = React.useState(false);

  const baseClasses =
    "relative flex flex-row gap-3 items-center border-2 border-background-200 !px-6 !py-4 w-full rounded-full color-background-500 transition-all";
  const hoverClasses =
    "hover:border-background-500 focus:border-background-500";

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
          onPointerEnter={() => setSearchHovered(true)}
          onPointerLeave={() => setSearchHovered(false)}
        >
          <Text
            className={
              "text-base font-medium text-background-500 " +
              (searchHovered ? "text-primary-500" : "")
            }
          >
            Search
          </Text>
        </Pressable>
      </Box>
    </View>
  );
}
