import Button from "@/components/ui/button/button";
import Divider from "@/components/ui/divider/divider";
import ColorFilter from "@/components/ui/filters/filter-types/color-filter";
import RarityFilter from "@/components/ui/filters/filter-types/rarity-filter";
import TypeFilter from "@/components/ui/filters/filter-types/type-filter";
import Modal from "@/components/ui/modal/modal";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  addLocalStorageDashboardGraph,
  getLocalStorageDashboard,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { CardFilterSortType } from "@/models/sorted-cards/sorted-cards";
import {
  faChartSimple,
  faCheck,
  faInfoCircle,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { View } from "react-native";

export interface CardSaveAsGraphModalProps {
  sectionId?: string;
  type?: CardFilterSortType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardSaveAsGraphModal({
  sectionId,
  type = "cost",
  open,
  setOpen,
}: CardSaveAsGraphModalProps) {
  const { setDashboard } = useContext(DashboardContext);

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [sortType, setSortType] = React.useState(type);

  const [colorFilter, setColorFilter] = React.useState([] as MTGColor[]);
  const [typeFilter, setTypeFilter] = React.useState([] as MTGCardTypes[]);
  const [rarityFilter, setRarityFilter] = React.useState([] as MTGRarity[]);

  function createGraph() {
    setDisabled(true);

    addLocalStorageDashboardGraph(sectionId ?? "unsorted", {
      type: sortType,
      title: generateTitle(type, colorFilter, typeFilter, rarityFilter),
      filters: {
        colorFilter,
        typeFilter,
        rarityFilter,
      },
    });

    setDashboard(getLocalStorageDashboard());

    setTimeout(() => {
      setSuccess(true);
      setDisabled(false);
    }, 500);

    setTimeout(() => setSuccess(false), 2000);
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
              Sort Type
            </Text>

            <Divider thick />

            <View className="flex flex-row gap-2 max-w-96">
              <Button
                rounded
                text="Cost"
                className="flex-1"
                type={sortType !== "cost" ? "outlined" : "default"}
                onClick={() => setSortType("cost")}
              ></Button>

              <Button
                rounded
                text="Color"
                className="flex-1"
                type={sortType !== "color" ? "outlined" : "default"}
                onClick={() => setSortType("color")}
              ></Button>

              <Button
                rounded
                text="Type"
                className="flex-1"
                type={sortType !== "type" ? "outlined" : "default"}
                onClick={() => setSortType("type")}
              ></Button>
            </View>
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Color
            </Text>

            <Divider thick />

            <ColorFilter flat setColorFilters={setColorFilter} />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Type
            </Text>

            <Divider thick />

            <TypeFilter flat setTypeFilters={setTypeFilter} />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Rarity
            </Text>

            <Divider thick />

            <RarityFilter flat setRarityFilters={setRarityFilter} />
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

function generateTitle(
  type: CardFilterSortType,
  colorFilter: MTGColor[],
  typeFilter: MTGCardTypes[],
  rarityFilter: MTGRarity[]
) {
  let title = "";

  if (colorFilter.length > 0) {
    if (colorFilter.includes("mono")) {
      title += "Mono " + (colorFilter.length === 1 ? "Colored " : "");
    }
    if (colorFilter.includes("white")) title += "White ";
    if (colorFilter.includes("blue")) title += "Blue ";
    if (colorFilter.includes("black")) title += "Black ";
    if (colorFilter.includes("red")) title += "Red ";
    if (colorFilter.includes("green")) title += "Green ";
    if (colorFilter.includes("gold")) title += "Gold ";
    if (colorFilter.includes("colorless")) title += "Colorless ";
  }

  if (typeFilter.length > 0) {
    const multiple = typeFilter.length > 1;

    if (typeFilter.includes(MTGCardTypes.CREATURE))
      title += "Creature" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.INSTANT))
      title += "Instant" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.SORCERY))
      title += "Sorcery" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.ARTIFACT))
      title += "Artifact" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.ENCHANTMENT))
      title += "Enchantment" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.LAND))
      title += "Land" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.PLANESWALKER))
      title += "Planeswalker" + (multiple ? ", " : " ");
    if (typeFilter.includes(MTGCardTypes.BATTLE)) title += "Battle ";
  }

  if (rarityFilter.length > 0) {
    const multiple = rarityFilter.length > 1;

    if (rarityFilter.includes("common"))
      title += "Common" + (multiple ? ", " : " ");
    if (rarityFilter.includes("uncommon"))
      title += "Uncommon" + (multiple ? ", " : " ");
    if (rarityFilter.includes("rare"))
      title += "Rare" + (multiple ? ", " : " ");
    if (rarityFilter.includes("mythic"))
      title += "Mythic" + (multiple ? ", " : " ");
  }

  title += "Cards by " + titleCase(type);

  return title;
}
