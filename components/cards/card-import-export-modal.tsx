import Text from "@/components/ui/text/text";
import BoardContext from "@/contexts/cards/board.context";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import {
  getLocalStorageStoredCards,
  saveLocalStorageCard,
  setLocalStorageCards,
} from "@/functions/local-storage/card-local-storage";
import ScryfallService from "@/hooks/scryfall.service";
import { CardIdentifier } from "@/models/card/card";
import {
  faCheck,
  faFileArrowDown,
  faFileArrowUp,
  faInfoCircle,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";
import Button from "../ui/button/button";
import Modal from "../ui/modal/modal";

export interface CardImportExportModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardImportExportModal({
  open,
  setOpen,
}: CardImportExportModalProps) {
  const { board } = useContext(BoardContext);
  const { setStoredCards } = useContext(StoredCardsContext);

  const [cards, setCards] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  useEffect(() => {
    setCards(getCardsForExport());
  });

  function getCardsForExport() {
    return getLocalStorageStoredCards()
      .map(
        (card) =>
          `${card.count} ${card.name} (${card.set?.toUpperCase()}) ${
            card.collectorNumber
          }`
      )
      .join("\n");
  }

  function getCardsFromImport(importText: string) {
    setDisabled(true);

    const cardIdentifiers: CardIdentifier[] = [];

    let errorFound = false;

    importText.split("\n").forEach((card) => {
      if (errorFound) return;

      const cardInfo = card.split(" ");
      const infoLength = cardInfo.length;

      const cardCount = Number(cardInfo?.[0]);
      if (!cardCount) {
        errorFound = true;
        setError(true);
        setDisabled(false);
      }

      const identifier = cardInfo?.[infoLength - 1];
      if (!identifier) {
        errorFound = true;
        setError(true);
        setDisabled(false);
      }

      if (Number(identifier) > 0) {
        const cardSet = cardInfo?.[infoLength - 2]?.substring(1, 4);
        if (!cardSet) {
          errorFound = true;
          setError(true);
          setDisabled(false);
        }

        for (let i = 0; i < cardCount; i++) {
          cardIdentifiers.push({
            set: cardSet.toLowerCase(),
            collector_number: identifier,
          });
        }
      } else if (identifier?.split("-")?.length === 5) {
        for (let i = 0; i < cardCount; i++) {
          cardIdentifiers.push({
            id: identifier,
          });
        }
      } else {
        cardInfo.shift();

        for (let i = 0; i < cardCount; i++) {
          cardIdentifiers.push({
            name: cardInfo.join(" "),
          });
        }
      }
    });

    if (errorFound) {
      setTimeout(() => setError(false), 3000);
      return;
    } else {
      ScryfallService.getCardsFromCollection(cardIdentifiers).then(
        (newCards) => {
          setLocalStorageCards([], board);
          newCards.forEach((card) => saveLocalStorageCard(card, 1, board));
          setStoredCards(newCards);

          setDisabled(false);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      );
    }
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <View className="flex gap-3">
        <Text size="xl">Import/Export Cards</Text>

        <View className="bg-background-100 p-4 rounded-xl overflow-hidden">
          <View className="max-h-40 overflow-y-auto">
            <Text mono>{cards}</Text>
          </View>
        </View>

        <Text className="pl-3">For importing use one of the standards:</Text>
        <Text mono className="-mt-2 px-2.5 py-1.5 bg-background-100 rounded-lg">
          1 id {"\n"}1 name {"\n"}1 name (set) collection_number
        </Text>

        <View className="flex flex-row justify-center gap-3">
          <Button
            rounded
            type="outlined"
            disabled={disabled}
            action={success ? "success" : error ? "danger" : "primary"}
            icon={
              disabled
                ? faRotate
                : success
                ? faCheck
                : error
                ? faInfoCircle
                : faFileArrowDown
            }
            text={
              disabled
                ? "Importing..."
                : success
                ? "Cards Imported!"
                : error
                ? "Error Importing Cards!"
                : "Import from Clipboard"
            }
            onClick={async () =>
              getCardsFromImport(await navigator.clipboard.readText())
            }
          />

          <Button
            rounded
            text="Copy to Clipboard"
            type="outlined"
            icon={faFileArrowUp}
            onClick={() => navigator.clipboard.writeText(cards)}
          />
        </View>
      </View>
    </Modal>
  );
}
