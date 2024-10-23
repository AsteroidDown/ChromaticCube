import Button from "@/components/ui/button/button";
import Divider from "@/components/ui/divider/divider";
import ColorFilter from "@/components/ui/filters/filter-types/color-filter";
import RarityFilter from "@/components/ui/filters/filter-types/rarity-filter";
import TypeFilter from "@/components/ui/filters/filter-types/type-filter";
import Modal from "@/components/ui/modal/modal";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import { MTGCardType } from "@/constants/mtg/mtg-types";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  addLocalStorageDashboardItem,
  getLocalStorageDashboard,
  updateLocalStorageDashboardItem,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import { DashboardItem } from "@/models/dashboard/dashboard";
import { CardFilterSortType } from "@/models/sorted-cards/sorted-cards";
import {
  faChartSimple,
  faCheck,
  faInfoCircle,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { View } from "react-native";

export interface CardSaveAsGraphModalProps {
  item?: DashboardItem;
  sectionId?: string;
  type?: CardFilterSortType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardSaveAsGraphModal({
  item,
  sectionId,
  type = "cost",
  open,
  setOpen,
}: CardSaveAsGraphModalProps) {
  const { setDashboard } = useContext(DashboardContext);

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [sortType, setSortType] = React.useState(
    (item ? item.sortType : type) as CardFilterSortType
  );

  const [colorFilter, setColorFilter] = React.useState(
    item?.filters.colorFilter as MTGColor[] | undefined
  );
  const [typeFilter, setTypeFilter] = React.useState(
    item?.filters.typeFilter as MTGCardType[] | undefined
  );
  const [rarityFilter, setRarityFilter] = React.useState(
    item?.filters.rarityFilter as MTGRarity[] | undefined
  );

  function createGraph() {
    setDisabled(true);

    if (item) {
      updateLocalStorageDashboardItem(item.id, sectionId ?? "unsorted", {
        sortType: sortType,
        filters: {
          colorFilter,
          typeFilter,
          rarityFilter,
        },
      });
    } else {
      addLocalStorageDashboardItem(sectionId ?? "unsorted", {
        title: generateGraphTitle(
          sortType,
          colorFilter,
          typeFilter,
          rarityFilter
        ),
        itemType: "graph",
        sortType: sortType,
        stacked: true,
        size: "lg",
        filters: {
          colorFilter,
          typeFilter,
          rarityFilter,
        },
      });
    }

    setDashboard(getLocalStorageDashboard());

    setTimeout(() => {
      setSuccess(true);
      setDisabled(false);
    }, 500);

    setTimeout(() => {
      setSuccess(false);
      if (item) setOpen(false);
    }, 2000);
  }

  return (
    <Modal open={open} setOpen={setOpen}>
      <View className="flex gap-2 max-w-[400px]">
        <View className="flex flex-row gap-4">
          <FontAwesomeIcon
            icon={faChartSimple}
            size="2xl"
            className="color-white"
          />
          <Text size="2xl" thickness="bold">
            {item ? "Update Graph" : "Save As Graph"}
          </Text>
        </View>

        <View className="flex gap-4">
          <Text>
            {item
              ? "Update the filters for " + item.title
              : "Add a graph to the dashboard with the following filters:"}
          </Text>

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

            <ColorFilter
              flat
              colorFilters={colorFilter}
              setColorFilters={setColorFilter}
            />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Type
            </Text>

            <Divider thick />

            <TypeFilter
              flat
              typeFilters={typeFilter}
              setTypeFilters={setTypeFilter}
            />
          </View>

          <View className="flex gap-2 max-w-96">
            <Text size="md" thickness="bold">
              Rarity
            </Text>

            <Divider thick />

            <RarityFilter
              flat
              rarityFilters={rarityFilter}
              setRarityFilters={setRarityFilter}
            />
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
              ? item
                ? "Updating Graph..."
                : "Creating Graph..."
              : success
              ? item
                ? "Graph Updated! Closing..."
                : "Graph Created!"
              : error
              ? "Error Creating Graph!"
              : item
              ? "Update Graph"
              : "Create Graph"
          }
          onClick={async () => createGraph()}
        />
      </View>
    </Modal>
  );
}

export function generateGraphTitle(
  type: CardFilterSortType,
  colorFilter?: MTGColor[],
  typeFilter?: MTGCardType[],
  rarityFilter?: MTGRarity[]
) {
  let title = "";

  if (colorFilter?.length) {
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

  if (rarityFilter?.length) {
    const multiple = rarityFilter.length > 1;

    if (rarityFilter.includes("common")) {
      title += "Common" + (multiple ? ", " : " ");
    }
    if (rarityFilter.includes("uncommon")) {
      title += "Uncommon" + (multiple ? ", " : " ");
    }
    if (rarityFilter.includes("rare")) {
      title += "Rare" + (multiple ? ", " : " ");
    }
    if (rarityFilter.includes("mythic")) {
      title += "Mythic" + (multiple ? ", " : " ");
    }
  }

  if (typeFilter?.length) {
    const multiple = typeFilter.length > 1;

    if (typeFilter.includes("creature")) {
      title += "Creature" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("instant")) {
      title += "Instant" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("sorcery")) {
      title += "Sorcery" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("artifact")) {
      title += "Artifact" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("enchantment")) {
      title += "Enchantment" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("land")) {
      title += "Land" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("planeswalker")) {
      title += "Planeswalker" + (multiple ? ", " : " ");
    }
    if (typeFilter.includes("battle")) {
      title += "Battle ";
    }
  }

  title += "Cards by " + titleCase(type);

  return title;
}
