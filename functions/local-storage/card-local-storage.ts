import { Platform } from "react-native";
import { Card } from "../../models/card/card";

export function getLocalStorageStoredCards(maybeBoard?: boolean) {
  if (Platform.OS === "ios") return [];

  const storedCards: string[] = JSON.parse(
    localStorage.getItem(maybeBoard ? "cubeCardsMaybe" : "cubeCards") || "[]"
  );

  return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
}

export function setLocalStorageCards(cards: Card[], maybeBoard?: boolean) {
  localStorage.setItem(
    maybeBoard ? "cubeCardsMaybe" : "cubeCards",
    JSON.stringify(cards.map((card) => JSON.stringify(card)))
  );
}

export function saveLocalStorageCard(card: Card, maybeBoard?: boolean) {
  if (Platform.OS === "ios") return;

  const storedCards = getLocalStorageStoredCards(maybeBoard);

  const storedCardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (storedCardIndex >= 0) storedCards[storedCardIndex].count += 1;
  else storedCards.push(card);

  const newCards = JSON.stringify([
    ...storedCards.map((storedCard) => JSON.stringify(storedCard)),
  ]);
  localStorage.setItem(maybeBoard ? "cubeCardsMaybe" : "cubeCards", newCards);

  return storedCards;
}

export function switchLocalStorageCardPrint(
  card: Card,
  print: Card,
  maybeBoard?: boolean
) {
  const storedCards = getLocalStorageStoredCards(maybeBoard);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    const storedCard = storedCards[cardIndex];
    print.count = storedCard.count;
    storedCards[cardIndex] = print;

    localStorage.setItem(
      maybeBoard ? "cubeCardsMaybe" : "cubeCards",
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  }
}

export function addToLocalStorageCardCount(card: Card, maybeBoard?: boolean) {
  const storedCards = getLocalStorageStoredCards(maybeBoard);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    storedCards[cardIndex].count += 1;

    localStorage.setItem(
      maybeBoard ? "cubeCardsMaybe" : "cubeCards",
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  } else saveLocalStorageCard(card);
}

export function removeFromLocalStorageCardCount(
  card: Card,
  maybeBoard?: boolean
) {
  const storedCards = getLocalStorageStoredCards(maybeBoard);

  const cardIndex = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (cardIndex >= 0) {
    storedCards[cardIndex].count -= 1;

    if (storedCards[cardIndex].count <= 0) removeLocalStorageCard(card);
    else {
      localStorage.setItem(
        maybeBoard ? "cubeCardsMaybe" : "cubeCards",
        JSON.stringify(
          storedCards.map((storedCard) => JSON.stringify(storedCard))
        )
      );
    }
  }
}

export function removeLocalStorageCard(card: Card, maybeBoard?: boolean) {
  if (Platform.OS === "ios") return;

  const storedCards = getLocalStorageStoredCards(maybeBoard);

  const index = storedCards.findIndex(
    (storedCard) => storedCard.id === card.id
  );

  if (index >= 0) {
    storedCards.splice(index, 1);
    localStorage.setItem(
      maybeBoard ? "cubeCardsMaybe" : "cubeCards",
      JSON.stringify(
        storedCards.map((storedCard) => JSON.stringify(storedCard))
      )
    );
  }
}
