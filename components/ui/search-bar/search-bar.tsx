import React from "react";
import { TextInput, View } from "react-native";

export interface SearchBarProps {
  search: string;
  onSearchChange: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBar({ search, onSearchChange }: SearchBarProps) {
  return (
    <View className="flex">
      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Find a Card"
        className="h-10 m-3 bg-background-200 border border-background-500 rounded color-background-500 px-4 hover:border-background-600"
      />
    </View>
  );
}
