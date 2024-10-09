import { BoardType } from "@/contexts/cards/board.context";
import { Platform } from "react-native";
import { Card } from "../../models/card/card";
import { titleCase } from "../text-manipulation";

export function getLocalStorageStoredCards(board: BoardType = "main") {
  if (Platform.OS === "ios") return [];

  const storedCards: string[] = JSON.parse(
    localStorage.getItem("cubeCards" + titleCase(board)) || "[]"
  );

  return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
}

export function setLocalStorageCards(cards: Card[], board?: BoardType) {
  localStorage.setItem(
    "cubeCards" + titleCase(board),
    JSON.stringify(cards.map((card) => JSON.stringify(card)))
  );
}

export function saveLocalStorageCard(card: Card, board?: BoardType) {
  if (Platform.OS === "ios") return;

  const storedCards = getLocalStorageStoredCards(board);

  const storedCardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (storedCardIndex >= 0) storedCards[storedCardIndex].count += 1;
  else storedCards.push(card);

  const newCards = JSON.stringify([
    ...storedCards.map((storedCard) => JSON.stringify(storedCard)),
  ]);
  localStorage.setItem("cubeCards" + titleCase(board), newCards);

  return storedCards;
}

export function switchLocalStorageCardPrint(
  card: Card,
  print: Card,
  board?: BoardType
) {
  const storedCards = getLocalStorageStoredCards(board);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    const storedCard = storedCards[cardIndex];
    print.count = storedCard.count;
    storedCards[cardIndex] = print;

    localStorage.setItem(
      "cubeCards" + titleCase(board),
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  }
}

export function addToLocalStorageCardCount(card: Card, board?: BoardType) {
  const storedCards = getLocalStorageStoredCards(board);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    storedCards[cardIndex].count += 1;

    localStorage.setItem(
      "cubeCards" + titleCase(board),
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  } else saveLocalStorageCard(card);
}

export function removeFromLocalStorageCardCount(card: Card, board?: BoardType) {
  const storedCards = getLocalStorageStoredCards(board);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    storedCards[cardIndex].count -= 1;

    if (storedCards[cardIndex].count <= 0) removeLocalStorageCard(card);
    else {
      localStorage.setItem(
        "cubeCards" + titleCase(board),
        JSON.stringify(
          storedCards.map((storedCard) => JSON.stringify(storedCard))
        )
      );
    }
  }
}

export function removeLocalStorageCard(card: Card, board?: BoardType) {
  if (Platform.OS === "ios") return;

  const storedCards = getLocalStorageStoredCards(board);

  const index = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (index >= 0) {
    storedCards.splice(index, 1);
    localStorage.setItem(
      "cubeCards" + titleCase(board),
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  }
}
