import React from "react";
import { View } from "react-native";
import CardDetails from "../../components/card-details/card-details";
import SearchBar from "../../components/ui/search-bar/search-bar";
import CardsService from "../../hooks/cards.service";
import { Card } from "../../models/card";

export default function CardsPage() {
  const [search, onSearchChange] = React.useState("");
  const [card, setCard] = React.useState(null as Card | null);

  function getCard() {
    CardsService.getCard(search)
      .then((card) => setCard(card))
      .catch((error) => console.error(error));
  }

  return (
    <View className="flex justify-center items-center w-full h-full bg-background-100">
      <View className="flex gap-4 items-center  max-w-fit ">
        <SearchBar
          search={search}
          onSearchChange={onSearchChange}
          searchAction={getCard}
        />

        <CardDetails card={card} />
      </View>
    </View>
  );
}
