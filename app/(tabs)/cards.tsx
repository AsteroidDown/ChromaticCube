import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
  const [savedCards, setSavedCards] = React.useState([] as Card[]);

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function getCard() {
    CardsService.getCard(search).then((card) => setCard(card));
  }

  function findCards() {
    CardsService.findCards(search).then((cards) => setSearchedCards(cards));
  }

  function getStoredCards() {
    const storedCards: string[] = JSON.parse(
      localStorage.getItem("cubeCards") || "[]"
    );

    return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
  }

  function saveCard(card?: Card) {
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

  // useEffect(() => setSavedCards(getStoredCards()));

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

          <View className="w-full">
            <CardDetails card={card} action={() => saveCard(card)} />
          </View>
        </View>

        <Box classes="w-full min-h-[500px]">
          {savedCards?.length > 0 && (
            <View className="flex flex-row flex-wrap gap-4 justify-center items-center">
              {savedCards.map((card, index) => (
                <CardImage
                  card={card}
                  key={card.id + index}
                  actionIcon={faTrash}
                  action={() => removeCard(card)}
                />
              ))}
            </View>
          )}
        </Box>
      </View>
    </ScrollView>
  );
}
