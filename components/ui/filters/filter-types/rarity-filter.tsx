import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MTGRarity } from "../../../../constants/mtg/mtg-rarity";
import Chip from "../../chip/chip";
import { Dropdown } from "../../dropdown/dropdown";

export interface RarityFilterProps {
  reset: boolean;
  setRarityFilters: React.Dispatch<React.SetStateAction<MTGRarity[]>>;
}

export default function RarityFilter({
  setRarityFilters,
  reset,
}: RarityFilterProps) {
  const [expanded, setExpanded] = React.useState(false);

  const [commonApplied, setCommonApplied] = React.useState(false);
  const [uncommonApplied, setUncommonApplied] = React.useState(false);
  const [rareApplied, setRareApplied] = React.useState(false);
  const [mythicApplied, setMythicApplied] = React.useState(false);

  const [appliedFilters, setAppliedFilters] = React.useState([] as MTGRarity[]);

  useEffect(() => {
    setAppliedFilters([
      ...(commonApplied ? ["common"] : []),
      ...(uncommonApplied ? ["uncommon"] : []),
      ...(rareApplied ? ["rare"] : []),
      ...(mythicApplied ? ["mythic"] : []),
    ] as MTGRarity[]);
  }, [commonApplied, uncommonApplied, rareApplied, mythicApplied]);

  useEffect(() => setRarityFilters(appliedFilters), [appliedFilters]);

  useEffect(() => {
    setCommonApplied(false);
    setUncommonApplied(false);
    setRareApplied(false);
    setMythicApplied(false);
    setAppliedFilters([]);
  }, [reset]);

  return (
    <View>
      <Chip
        type="outlined"
        text="Rarity"
        onClick={() => setExpanded(!expanded)}
      >
        <View
          className={`overflow-hidden transition-all duration-300 ${
            appliedFilters.length ? "ml-0 max-w-[100px]" : "-ml-2 max-w-[0px]"
          }`}
        >
          <Text
            className={`font-semibold text-dark-100 rounded-full px-[7px] py-[3px] bg-primary-200`}
          >
            {appliedFilters.length}
          </Text>
        </View>
      </Chip>

      <Dropdown
        expanded={expanded}
        setExpanded={setExpanded}
        className={`!max-w-[360px] px-4 py-2 border-2 border-primary-300 bg-dark-200 rounded-2xl shadow-lg`}
      >
        <View className="flex flex-row flex-wrap gap-2">
          <Chip
            text="Common"
            type={commonApplied ? "default" : "outlined"}
            onClick={() => setCommonApplied(!commonApplied)}
          />

          <Chip
            text="Uncommon"
            type={uncommonApplied ? "default" : "outlined"}
            onClick={() => setUncommonApplied(!uncommonApplied)}
          />

          <Chip
            text="Rare"
            type={rareApplied ? "default" : "outlined"}
            onClick={() => setRareApplied(!rareApplied)}
          />

          <Chip
            text="Mythic"
            type={mythicApplied ? "default" : "outlined"}
            onClick={() => setMythicApplied(!mythicApplied)}
          />
        </View>
      </Dropdown>
    </View>
  );
}
