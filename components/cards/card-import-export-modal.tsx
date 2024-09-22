import { getLocalStorageStoredCards } from "@/functions/local-storage/card-local-storage";
import {
  faFileArrowDown,
  faFileArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { Text, View } from "react-native";
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
  const [cards, setCards] = React.useState("");

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

  return (
    <Modal open={open} setOpen={setOpen}>
      <View className="flex gap-3">
        <Text className="text-white text-xl">Import/Export Cards</Text>

        <View className="bg-background-100 p-4 rounded-xl overflow-hidden">
          <View className="max-h-40 overflow-y-auto">
            <Text className="text-white">{cards}</Text>
          </View>
        </View>

        <View className="flex flex-row justify-center gap-3">
          <Button
            rounded
            text="Import from Clipboard"
            type="outlined"
            icon={faFileArrowDown}
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
