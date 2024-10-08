import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import DashboardContext from "@/contexts/dashboard/dashboard.context";
import {
  getLocalStorageDashboard,
  removeLocalStorageDashboardSection,
} from "@/functions/local-storage/dashboard-local-storage";
import {
  faChartSimple,
  faTable,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import React, { useContext } from "react";
import { ViewProps } from "react-native";
import CardSaveAsChartModal from "../cards/card-save-as-chart-modal";
import CardSaveAsGraphModal from "../cards/card-save-as-graph-modal";
import Dropdown from "../ui/dropdown/dropdown";

export type DashboardSectionOptionsMenuProps = ViewProps & {
  xOffset?: number;
  sectionId: string;
  addItemOpen: boolean;
  setAddItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
  addOnly?: boolean;
};

export default function DashboardSectionOptionsMenu({
  xOffset,
  sectionId,
  addItemOpen,
  setAddItemOpen,
  addOnly = false,
}: DashboardSectionOptionsMenuProps) {
  const { setDashboard } = useContext(DashboardContext);

  const [addGraphOpen, setAddGraphOpen] = React.useState(false);
  const [addChartOpen, setAddChartOpen] = React.useState(false);

  function removeSection(sectionId: string) {
    removeLocalStorageDashboardSection(sectionId);
    setDashboard(getLocalStorageDashboard());
  }

  return (
    <>
      <Dropdown
        xOffset={xOffset}
        expanded={addItemOpen}
        setExpanded={setAddItemOpen}
      >
        <Box className="flex justify-start items-start !p-0 border-2 border-background-100 !bg-background-200 overflow-hidden">
          <Button
            start
            square
            type="clear"
            text="Add Graph"
            className="w-full"
            icon={faChartSimple}
            onClick={() => {
              setAddGraphOpen(true);
              setAddItemOpen(false);
            }}
          />

          <Button
            start
            square
            type="clear"
            text="Add Chart"
            className="w-full"
            icon={faTable}
            onClick={() => {
              setAddChartOpen(true);
              setAddItemOpen(false);
            }}
          />

          {!addOnly && (
            <Button
              start
              square
              type="clear"
              text="Remove"
              className="w-full"
              icon={faTrash}
              onClick={() => {
                removeSection(sectionId);
                setAddItemOpen(false);
              }}
            />
          )}
        </Box>
      </Dropdown>

      <CardSaveAsGraphModal
        sectionId={sectionId}
        open={addGraphOpen}
        setOpen={setAddGraphOpen}
      />

      <CardSaveAsChartModal
        sectionId={sectionId}
        open={addChartOpen}
        setOpen={setAddChartOpen}
      />
    </>
  );
}
