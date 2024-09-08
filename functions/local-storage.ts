import { Platform } from "react-native";
import { Card } from "../models/card/card";

export function getLocalStorageStoredCards() {
  if (Platform.OS === "ios") return [];

  const storedCards: string[] = JSON.parse(
    localStorage.getItem("cubeCards") || "[]"
  );

  return storedCards.map((savedCard) => JSON.parse(savedCard) as Card);
}

export function saveLocalStorageCard(card?: Card) {
  if (Platform.OS === "ios") return;
  if (!card) return;

  const storedCards: string[] = JSON.parse(
    localStorage.getItem("cubeCards") || "[]"
  );
  const newCards = JSON.stringify([...storedCards, JSON.stringify(card)]);
  localStorage.setItem("cubeCards", newCards);

  return [
    ...storedCards.map((savedCard) => JSON.parse(savedCard) as Card),
    card,
  ];
}

export function removeLocalStorageCard(card: Card) {
  if (Platform.OS === "ios") return;

  const storedCards = getLocalStorageStoredCards();

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
  }
}
