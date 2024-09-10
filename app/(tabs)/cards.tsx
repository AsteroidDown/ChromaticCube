import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import CardDetailedPreview from "../../components/cards/card-detailed-preview";
import CardImage from "../../components/cards/card-image";
import CardItemGallery from "../../components/cards/card-item-gallery";
import Box from "../../components/ui/box/box";
import Button from "../../components/ui/button/button";
import SearchBar from "../../components/ui/search-bar/search-bar";
import {
  getLocalStorageStoredCards,
  saveLocalStorageCard,
} from "../../functions/local-storage";
import ScryfallService from "../../hooks/scryfall.service";
import { Card } from "../../models/card/card";

export default function CardsPage() {
  const [search, onSearchChange] = React.useState("");
  const [card, setCard] = React.useState(undefined as Card | undefined);
  const [searchedCards, setSearchedCards] = React.useState([] as Card[]);
  const [savedCards, setSavedCards] = React.useState([] as Card[]);

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function getCard() {
    ScryfallService.getCard(search).then((card) => setCard(card));
  }

  function findCards() {
    ScryfallService.findCards(search).then((cards) => setSearchedCards(cards));
  }

  function saveCard(card?: Card) {
    if (!card) return;

    const savedCards = saveLocalStorageCard(card);
    if (savedCards) setSavedCards(savedCards);
  }

  useEffect(() => setSavedCards(getLocalStorageStoredCards()), []);

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

            <Box className="flex-1 min-h-[350px]">
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

          <CardDetailedPreview card={card}>
            <Button
              text="Add Card"
              icon={faPlus}
              disabled={!card}
              onClick={() => saveCard(card)}
            />
          </CardDetailedPreview>
        </View>

        <CardItemGallery cards={savedCards} />
      </View>
    </ScrollView>
  );
}
