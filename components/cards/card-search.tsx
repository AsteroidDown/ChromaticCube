import { faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { ActionColor } from "../../constants/ui/colors";
import StoredCardsContext from "../../contexts/cards/stored-cards.context";
import { saveLocalStorageCard } from "../../functions/local-storage";
import ScryfallService from "../../hooks/scryfall.service";
import { Card } from "../../models/card/card";
import Box from "../ui/box/box";
import Button from "../ui/button/button";
import SearchBar from "../ui/search-bar/search-bar";
import CardDetailedPreview from "./card-detailed-preview";
import CardImage from "./card-image";

export default function CardSearch() {
  const { maybeBoard, setStoredCards } = useContext(StoredCardsContext);

  const [search, onSearchChange] = React.useState("");

  const [card, setCard] = React.useState(undefined as Card | undefined);
  const [searchedCards, setSearchedCards] = React.useState([] as Card[]);

  const [buttonText, setButtonText] = React.useState("Add Card");
  const [buttonAction, setButtonAction] = React.useState(
    "primary" as ActionColor
  );

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function getCard() {
    ScryfallService.getCard(search).then((card) => setCard(card));
  }

  function findCards() {
    ScryfallService.findCards(search).then((cards) => {
      setSearchedCards(cards);

      if (cards.length === 1) setCard(cards[0]);
    });
  }

  function saveCard(card?: Card) {
    if (!card) return;

    const storedCards = saveLocalStorageCard(card, maybeBoard);
    if (storedCards) setStoredCards(storedCards);

    setButtonText("Card Added!");
    setButtonAction("success");

    setTimeout(() => {
      setButtonText("Add Card");
      setButtonAction("primary");
    }, 3000);
  }

  return (
    <View className="flex flex-row flex-wrap gap-4">
      <View className="flex flex-1 gap-4 min-w-[360px]">
        <SearchBar
          search={search}
          searchAction={findCards}
          onSearchChange={onSearchChange}
        />

        <Box className="flex-[2] min-h-[350px] h-full">
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
          icon={faPlus}
          disabled={!card}
          text={buttonText}
          action={buttonAction}
          onClick={() => saveCard(card)}
        />
      </CardDetailedPreview>
    </View>
  );
}
