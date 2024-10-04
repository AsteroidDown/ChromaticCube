import Box from "@/components/ui/box/box";
import Button from "@/components/ui/button/button";
import { faChartSimple, faTable } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ViewProps } from "react-native";
import CardSaveAsChartModal from "../cards/card-save-as-chart-modal";
import CardSaveAsGraphModal from "../cards/card-save-as-graph-modal";
import Dropdown from "../ui/dropdown/dropdown";

export type DashboardAddItemMenuProps = ViewProps & {
  xOffset?: number;
  sectionId: string;
  addItemOpen: boolean;
  setAddItemOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function DashboardAddItemMenu({
  xOffset,
  sectionId,
  addItemOpen,
  setAddItemOpen,
}: DashboardAddItemMenuProps) {
  const [addGraphOpen, setAddGraphOpen] = React.useState(false);
  const [addChartOpen, setAddChartOpen] = React.useState(false);

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
