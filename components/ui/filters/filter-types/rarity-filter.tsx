import Chip from "@/components/ui/chip/chip";
import Dropdown from "@/components/ui/dropdown/dropdown";
import Text from "@/components/ui/text/text";
import { MTGRarity } from "@/constants/mtg/mtg-rarity";
import React, { useEffect } from "react";
import { View } from "react-native";

export interface RarityFilterProps {
  flat?: boolean;
  reset?: boolean;
  setRarityFilters: React.Dispatch<React.SetStateAction<MTGRarity[]>>;
}

export default function RarityFilter({
  flat,
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

  const rarityFiltersList = (
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
  );

  if (flat) return rarityFiltersList;

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
            thickness="semi"
            className={`!text-dark-100 rounded-full px-[9px] py-[3px] bg-primary-200`}
          >
            {appliedFilters.length}
          </Text>
        </View>
      </Chip>

      <Dropdown
        expanded={expanded}
        setExpanded={setExpanded}
        className={`!max-w-[360px] px-4 py-2 border-2 border-primary-300 bg-background-100 rounded-2xl shadow-lg`}
      >
        {rarityFiltersList}
      </Dropdown>
    </View>
  );
}
