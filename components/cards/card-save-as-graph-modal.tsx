import Button from "@/components/ui/button/button";
import ColorFilter from "@/components/ui/filters/filter-types/color-filter";
import RarityFilter from "@/components/ui/filters/filter-types/rarity-filter";
import TypeFilter from "@/components/ui/filters/filter-types/type-filter";
import Modal from "@/components/ui/modal/modal";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import StoredCardsContext from "@/contexts/cards/stored-cards.context";
import {
  faChartSimple,
  faCheck,
  faInfoCircle,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import Divider from "../ui/divider/divider";

export interface CardSaveAsGraphModalProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardSaveAsGraphModal({
  open,
  setOpen,
}: CardSaveAsGraphModalProps) {
  const { maybeBoard, setStoredCards } = useContext(StoredCardsContext);

  const [cards, setCards] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [colorFilters, setColorFilters] = React.useState([] as MTGColor[]);
  const [typeFilters, setTypeFilters] = React.useState([] as MTGCardTypes[]);
  const [rarityFilters, setRarityFilters] = React.useState([] as MTGRarity[]);

  function createGraph() {
    setDisabled(true);

    setTimeout(() => setSuccess(true), 3000);
    setTimeout(() => setDisabled(false), 3000);

    setTimeout(() => setSuccess(false), 6000);
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <View className="flex gap-2">
        <Text size="2xl" thickness="bold">
          Save As Graph
        </Text>

        <View className="flex gap-4">
          <Text>Add a graph to the dashboard with the following filters:</Text>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Color
            </Text>

            <Divider thick />

            <ColorFilter flat setColorFilters={setColorFilters} />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Type
            </Text>

            <Divider thick />

            <TypeFilter flat setTypeFilters={setTypeFilters} />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Rarity
            </Text>

            <Divider thick />

            <RarityFilter flat setRarityFilters={setRarityFilters} />
          </View>
        </View>

        <Button
          rounded
          type="outlined"
          className="mt-4"
          disabled={disabled}
          action={success ? "success" : error ? "danger" : "primary"}
          icon={
            disabled
              ? faRotate
              : success
              ? faCheck
              : error
              ? faInfoCircle
              : faChartSimple
          }
          text={
            disabled
              ? "Creating Graph..."
              : success
              ? "Graph Created!"
              : error
              ? "Error Creating Graph!"
              : "Create Graph"
          }
          onClick={async () => createGraph()}
        />
      </View>
    </Modal>
  );
}
