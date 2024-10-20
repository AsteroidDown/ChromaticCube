import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import SearchBar from "@/components/ui/search-bar/search-bar";
import { ActionColor } from "@/constants/ui/colors";
import BoardContext from "@/contexts/cards/board.context";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import { saveLocalStorageCard } from "@/functions/local-storage/card-local-storage";
import ScryfallService from "@/hooks/scryfall.service";
import { Card } from "@/models/card/card";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useState } from "react";
import { View } from "react-native";
import Dropdown from "../ui/dropdown/dropdown";
import CardDetailedPreview from "./card-detailed-preview";
import CardImage from "./card-image";
import CardPrints from "./card-prints";

export default function CardSearch() {
  const { board } = useContext(BoardContext);
  const { setStoredCards } = useContext(StoredCardsContext);

  const [search, onSearchChange] = useState("");

  const [card, setCard] = useState(undefined as Card | undefined);
  const [searchedCards, setSearchedCards] = useState([] as Card[]);

  const [buttonText, setButtonText] = useState("Add Card");
  const [buttonAction, setButtonAction] = useState("primary" as ActionColor);

  const [noSearchResults, setNoSearchResults] = useState(false);
  const [noSearchResultsTimer, setNoSearchResultsTimer] =
    useState<NodeJS.Timeout>();
  const [noResultsSearch, setNoResultsSearch] = useState("");

  const [addMultipleOpen, setAddMultipleOpen] = useState(false);

  const searchedCardsPlaceholder = Array(5).fill(undefined);

  function findCards(query?: string) {
    ScryfallService.findCards(query ?? search).then((cards) => {
      // If a no search results message is currently rendered, clear the disappear message timeout
      if (noSearchResultsTimer) {
        clearTimeout(noSearchResultsTimer);
        setNoSearchResults(false);
      }

      // One result returned, auto-populate the card-detailed-preview with it
      if (cards.length === 1) setCard(cards[0]);

      if (cards.length === 0) {
        // Show "No search results" message for a short period of time
        setNoSearchResults(true);
        const noResultsTimer = setTimeout(() => {
          setNoSearchResults(false);
        }, 2500);

        setNoSearchResultsTimer(noResultsTimer);
        setNoResultsSearch(search);
      } else {
        setSearchedCards(cards);
      }
    });
  }

  function saveCard(card?: Card, count = 1) {
    if (!card) return;

    setAddMultipleOpen(false);

    const storedCards = saveLocalStorageCard(card, count, board);
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
          searchChange={onSearchChange}
          noSearchResults={noSearchResults}
        />

        <Box className="flex-[2] min-h-[350px] h-full z-[-1]">
          <View className="overflow-x-auto overflow-y-hidden h-full">
            {!searchedCards?.length && (
              <View className="flex flex-row flex-1 gap-4">
                {searchedCardsPlaceholder.map((_, index) => (
                  <CardImage key={index} />
                ))}
              </View>
            )}

            {searchedCards?.length > 0 && (
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

          {noSearchResults && (
            <View className="absolute bottom-2 flex w-full justify-center text-red-500 font-bold items-center transition-all ease-in-out duration-1000">
              No cards found matching: "{noResultsSearch}"
            </View>
          )}
        </Box>
      </View>

      <CardDetailedPreview card={card}>
        <CardPrints card={card} setCard={setCard} />

        <View className="flex flex-row justify-center items-end w-full gap-0.5">
          <Button
            squareRight
            className="flex-1"
            icon={faPlus}
            disabled={!card}
            text={buttonText}
            action={buttonAction}
            onClick={() => saveCard(card)}
          />

          <Button
            squareLeft
            icon={faEllipsisV}
            disabled={!card}
            action={buttonAction}
            onClick={() => setAddMultipleOpen(true)}
          />

          <View className="-mx-px">
            <Dropdown
              xOffset={-104}
              expanded={addMultipleOpen}
              setExpanded={setAddMultipleOpen}
            >
              <Box className="flex justify-start items-start !p-0 border-2 border-primary-300 !bg-background-100 !bg-opacity-90 overflow-hidden">
                <Button
                  start
                  square
                  type="clear"
                  text="Add 2"
                  className="w-full"
                  icon={faPlus}
                  onClick={() => saveCard(card, 2)}
                />

                <Button
                  start
                  square
                  type="clear"
                  text="Add 3"
                  className="w-full"
                  icon={faPlus}
                  onClick={() => saveCard(card, 3)}
                />

                <Button
                  start
                  square
                  type="clear"
                  text="Add 4"
                  className="w-full"
                  icon={faPlus}
                  onClick={() => saveCard(card, 4)}
                />
              </Box>
            </Dropdown>
          </View>
        </View>
      </CardDetailedPreview>
    </View>
  );
}
