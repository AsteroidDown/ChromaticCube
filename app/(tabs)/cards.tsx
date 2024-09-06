import React from "react";
import { ScrollView, View } from "react-native";
import CardDetails from "../../components/card-details/card-details";
import CardImage from "../../components/card-details/card-image";
import Box from "../../components/ui/box/box";
import SearchBar from "../../components/ui/search-bar/search-bar";
import CardsService from "../../hooks/cards.service";
import { Card } from "../../models/card";

export default function CardsPage() {
  const [search, onSearchChange] = React.useState("");
  const [card, setCard] = React.useState(undefined as Card | undefined);
  const [searchedCards, setSearchedCards] = React.useState([] as Card[]);

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function getCard() {
    CardsService.getCard(search).then((card) => setCard(card));
  }

  function findCards() {
    CardsService.findCards(search).then((cards) => setSearchedCards(cards));
  }

  return (
    <View className="flex px-6 py-4 w-full h-full bg-background-100">
      <ScrollView>
        <View className="flex flex-row flex-wrap gap-4">
          <View className="flex flex-1 gap-4 min-w-[500px]">
            <SearchBar
              search={search}
              searchAction={findCards}
              onSearchChange={onSearchChange}
            />

            <Box classes="flex-1">
              <View className="overflow-x-auto overflow-y-hidden">
                {!searchedCards?.length && (
                  <View className="flex flex-row gap-4">
                    {searchedCardsPlaceholder.map((_, index) => (
                      <CardImage key={index} />
                    ))}
                  </View>
                )}

                {searchedCards?.length && (
                  <View className="flex flex-row gap-4">
                    {searchedCards.map((card) => (
                      <CardImage
                        card={card}
                        key={card.id}
                        onClick={() => setCard(card)}
                      />
                    ))}
                  </View>
                )}
              </View>
            </Box>
          </View>

          <CardDetails card={card} />
        </View>
      </ScrollView>
    </View>
  );
}
