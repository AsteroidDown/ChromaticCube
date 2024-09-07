import React, { useEffect } from "react";
import { Platform, ScrollView, View } from "react-native";
import CardCondensedGallery from "../../components/cards/card-condensed-gallery";
import CardDetailedPreview from "../../components/cards/card-detailed-preview";
import CardImage from "../../components/cards/card-image";
import Box from "../../components/ui/box/box";
import SearchBar from "../../components/ui/search-bar/search-bar";
import CardsService from "../../hooks/cards.service";
import { Card } from "../../models/card";

export default function CardsPage() {
  const [search, onSearchChange] = React.useState("");
  const [card, setCard] = React.useState(undefined as Card | undefined);
  const [searchedCards, setSearchedCards] = React.useState([] as Card[]);
  const [savedCards, setSavedCards] = React.useState([] as Card[]);

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function getCard() {
    CardsService.getCard(search).then((card) => setCard(card));
  }

  function findCards() {
    CardsService.findCards(search).then((cards) => setSearchedCards(cards));
  }

  function getStoredCards() {
    if (Platform.OS === "ios") return [];

    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  function saveCard(card?: Card) {
    if (Platform.OS === "ios") return;
    if (!card) return;

    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );
    const newCards = JSON.stringify([...storedCards, JSON.stringify(card)]);
    localStorage.setItem("cubeCards", newCards);

    const cards = storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
    setSavedCards([...cards, card]);
  }

  function removeCard(card: Card) {
    if (Platform.OS === "ios") return;

    const storedCards = getStoredCards();

    const index = storedCards.findIndex(
      (storedCard) => storedCard.id === card.id
    );
    if (index >= 0) {
      storedCards.splice(index, 1);
      localStorage.setItem(
        "cubeCards",
        JSON.stringify(
          storedCards.map((storedCard) => JSON.stringify(storedCard))
        )
      );

      setSavedCards(storedCards);
    }
  }

  useEffect(() => setSavedCards(getStoredCards()), []);

  return (
    <ScrollView>
      <View className="flex gap-4 px-6 py-4 w-full h-full bg-background-100">
        <View className="flex flex-row flex-wrap gap-4">
          <View className="flex flex-1 gap-4 min-w-[360px]">
            <SearchBar
              search={search}
              searchAction={findCards}
              onSearchChange={onSearchChange}
            />

            <Box classes="flex-1">
              <View className="overflow-x-auto overflow-y-hidden h-full">
                {!searchedCards?.length && (
                  <View className="flex flex-row gap-4 h-full">
                    {searchedCardsPlaceholder.map((_, index) => (
                      <CardImage key={index} />
                    ))}
                  </View>
                )}

                {searchedCards?.length >= 1 && (
                  <View className="flex flex-row gap-4 h-full">
                    {searchedCards.map((card, index) => (
                      <CardImage
                        card={card}
                        key={card.id + index}
                        onClick={() => setCard(card)}
                      />
                    ))}
                  </View>
                )}
              </View>
            </Box>
          </View>

          <CardDetailedPreview card={card} action={() => saveCard(card)} />
        </View>

        <CardCondensedGallery cards={savedCards} />
      </View>
    </ScrollView>
  );
}
