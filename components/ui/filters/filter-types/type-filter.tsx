import Chip from "@/components/ui/chip/chip";
import Dropdown from "@/components/ui/dropdown/dropdown";
import Text from "@/components/ui/text/text";
import { MTGCardTypes } from "@/constants/mtg/mtg-types";
import React, { useEffect } from "react";
import { View } from "react-native";

export interface TypeFilterProps {
  reset: boolean;
  setTypeFilters: React.Dispatch<React.SetStateAction<MTGCardTypes[]>>;
}

export default function TypeFilter({ setTypeFilters, reset }: TypeFilterProps) {
  const [expanded, setExpanded] = React.useState(false);

  const [creatureApplied, setCreatureApplied] = React.useState(false);
  const [instantApplied, setInstantApplied] = React.useState(false);
  const [sorceryApplied, setSorceryApplied] = React.useState(false);
  const [artifactApplied, setArtifactApplied] = React.useState(false);
  const [enchantmentApplied, setEnchantmentApplied] = React.useState(false);
  const [planeswalkerApplied, setPlaneswalkerApplied] = React.useState(false);
  const [battleApplied, setBattleApplied] = React.useState(false);
  const [landApplied, setLandApplied] = React.useState(false);

  const [appliedFilters, setAppliedFilters] = React.useState(
    [] as MTGCardTypes[]
  );

  useEffect(() => {
    setAppliedFilters([
      ...(creatureApplied ? [MTGCardTypes.CREATURE] : []),
      ...(instantApplied ? [MTGCardTypes.INSTANT] : []),
      ...(sorceryApplied ? [MTGCardTypes.SORCERY] : []),
      ...(artifactApplied ? [MTGCardTypes.ARTIFACT] : []),
      ...(enchantmentApplied ? [MTGCardTypes.ENCHANTMENT] : []),
      ...(landApplied ? [MTGCardTypes.LAND] : []),
      ...(planeswalkerApplied ? [MTGCardTypes.PLANESWALKER] : []),
      ...(battleApplied ? [MTGCardTypes.BATTLE] : []),
    ] as MTGCardTypes[]);
  }, [
    creatureApplied,
    instantApplied,
    sorceryApplied,
    artifactApplied,
    enchantmentApplied,
    landApplied,
    planeswalkerApplied,
    battleApplied,
  ]);

  useEffect(() => setTypeFilters(appliedFilters), [appliedFilters]);

  useEffect(() => {
    setCreatureApplied(false);
    setInstantApplied(false);
    setSorceryApplied(false);
    setArtifactApplied(false);
    setEnchantmentApplied(false);
    setLandApplied(false);
    setPlaneswalkerApplied(false);
    setBattleApplied(false);
    setAppliedFilters([]);
  }, [reset]);

  return (
    <View>
      <Chip type="outlined" text="Type" onClick={() => setExpanded(!expanded)}>
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
        className={`!max-w-[360px] px-4 py-2 border-2 border-primary-300 bg-dark-200 rounded-2xl shadow-lg`}
      >
        <View className="flex flex-row flex-wrap gap-2">
          <Chip
            text="Creature"
            type={creatureApplied ? "default" : "outlined"}
            onClick={() => setCreatureApplied(!creatureApplied)}
          />

          <Chip
            text="Instant"
            type={instantApplied ? "default" : "outlined"}
            onClick={() => setInstantApplied(!instantApplied)}
          />

          <Chip
            text="Sorcery"
            type={sorceryApplied ? "default" : "outlined"}
            onClick={() => setSorceryApplied(!sorceryApplied)}
          />

          <Chip
            text="Artifact"
            type={artifactApplied ? "default" : "outlined"}
            onClick={() => setArtifactApplied(!artifactApplied)}
          />

          <Chip
            text="Enchantment"
            type={enchantmentApplied ? "default" : "outlined"}
            onClick={() => setEnchantmentApplied(!enchantmentApplied)}
          />

          <Chip
            text="Land"
            type={landApplied ? "default" : "outlined"}
            onClick={() => setLandApplied(!landApplied)}
          />

          <Chip
            text="Planeswalker"
            type={planeswalkerApplied ? "default" : "outlined"}
            onClick={() => setPlaneswalkerApplied(!planeswalkerApplied)}
          />

          <Chip
            text="Battle"
            type={battleApplied ? "default" : "outlined"}
            onClick={() => setBattleApplied(!battleApplied)}
          />
        </View>
      </Dropdown>
    </View>
  );
}
