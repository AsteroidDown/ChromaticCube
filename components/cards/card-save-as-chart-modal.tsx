import Button from "@/components/ui/button/button";
import Divider from "@/components/ui/divider/divider";
import ColorFilter from "@/components/ui/filters/filter-types/color-filter";
import Modal from "@/components/ui/modal/modal";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  addLocalStorageDashboardItem,
  getLocalStorageDashboard,
} from "@/functions/local-storage/dashboard-local-storage";
import { titleCase } from "@/functions/text-manipulation";
import {
  faCheck,
  faInfoCircle,
  faRotate,
  faTable,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { View } from "react-native";
import { ChartType } from "../chart/chart";

export interface CardSaveAsChartModalProps {
  sectionId?: string;
  type?: ChartType;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CardSaveAsChartModal({
  sectionId,
  type = "cost",
  open,
  setOpen,
}: CardSaveAsChartModalProps) {
  const { setDashboard } = useContext(DashboardContext);

  const [disabled, setDisabled] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [sortType, setSortType] = React.useState(type);

  const [colorFilter, setColorFilter] = React.useState([] as MTGColor[]);

  function createChart() {
    setDisabled(true);

    addLocalStorageDashboardItem(sectionId ?? "unsorted", {
      title: generateTitle(sortType, colorFilter),
      sortType,
      itemType: "chart",
      stacked: true,
      size: "lg",
      smallTitles: true,
      filters: { colorFilter },
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
          Save As Chart
        </Text>

        <View className="flex gap-4">
          <Text>Add a Chart to the dashboard with the following filters:</Text>

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
                text="Rarity"
                className="flex-1"
                type={sortType !== "rarity" ? "outlined" : "default"}
                onClick={() => setSortType("rarity")}
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

            <ColorFilter flat excludeMono setColorFilters={setColorFilter} />
          </View>
        </View>

        <Button
          rounded
          type="outlined"
          className="mt-4"
          disabled={disabled || colorFilter.length === 0}
          action={success ? "success" : error ? "danger" : "primary"}
          icon={
            disabled
              ? faRotate
              : success
              ? faCheck
              : error
              ? faInfoCircle
              : faTable
          }
          text={
            disabled
              ? "Creating Chart..."
              : success
              ? "Chart Created!"
              : error
              ? "Error Creating Chart!"
              : "Create Chart"
          }
          onClick={async () => createChart()}
        />
      </View>
    </Modal>
  );
}

function generateTitle(type: ChartType, colorFilter: MTGColor[]) {
  let title = "";

  if (colorFilter.length > 0) {
    if (colorFilter.includes("white")) title += "White ";
    if (colorFilter.includes("blue")) title += "Blue ";
    if (colorFilter.includes("black")) title += "Black ";
    if (colorFilter.includes("red")) title += "Red ";
    if (colorFilter.includes("green")) title += "Green ";
    if (colorFilter.includes("gold")) title += "Gold ";
    if (colorFilter.includes("colorless")) title += "Colorless ";
  }

  title += "Cards by " + titleCase(type);

  return title;
}
