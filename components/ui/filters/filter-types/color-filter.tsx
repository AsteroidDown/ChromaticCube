import Chip from "@/components/ui/chip/chip";
import Dropdown from "@/components/ui/dropdown/dropdown";
import Text from "@/components/ui/text/text";
import { MTGColor } from "@/constants/mtg/mtg-colors";
import CardPreferencesContext from "@/contexts/cards/card-preferences.context";
import React, { useContext, useEffect } from "react";
import { View } from "react-native";

export interface ColorFilterProps {
  flat?: boolean;
  reset?: boolean;
  disabled?: boolean;
  excludeMono?: boolean;
  colorFilters?: MTGColor[];
  setColorFilters: React.Dispatch<React.SetStateAction<MTGColor[] | undefined>>;
}

export default function ColorFilter({
  flat,
  reset,
  disabled,
  excludeMono = false,
  colorFilters,
  setColorFilters,
}: ColorFilterProps) {
  const { preferences } = useContext(CardPreferencesContext);

  const [expanded, setExpanded] = React.useState(false);

  const [whiteApplied, setWhiteApplied] = React.useState(false);
  const [blueApplied, setBlueApplied] = React.useState(false);
  const [blackApplied, setBlackApplied] = React.useState(false);
  const [redApplied, setRedApplied] = React.useState(false);
  const [greenApplied, setGreenApplied] = React.useState(false);
  const [goldApplied, setGoldApplied] = React.useState(false);
  const [colorlessApplied, setColorlessApplied] = React.useState(false);
  const [monoColorApplied, setMonoColorApplied] = React.useState(false);

  const [appliedFilters, setAppliedFilters] = React.useState([] as MTGColor[]);

  useEffect(() => {
    setAppliedFilters([
      ...(whiteApplied ? ["white"] : []),
      ...(blueApplied ? ["blue"] : []),
      ...(blackApplied ? ["black"] : []),
      ...(redApplied ? ["red"] : []),
      ...(greenApplied ? ["green"] : []),
      ...(goldApplied ? ["gold"] : []),
      ...(colorlessApplied ? ["colorless"] : []),
      ...(monoColorApplied ? ["mono"] : []),
    ] as MTGColor[]);
  }, [
    whiteApplied,
    blueApplied,
    blackApplied,
    redApplied,
    greenApplied,
    goldApplied,
    colorlessApplied,
    monoColorApplied,
  ]);

  useEffect(() => setColorFilters(appliedFilters), [appliedFilters]);

  useEffect(() => {
    setWhiteApplied(false);
    setBlueApplied(false);
    setBlackApplied(false);
    setRedApplied(false);
    setGreenApplied(false);
    setGoldApplied(false);
    setColorlessApplied(false);
    setMonoColorApplied(false);
    setAppliedFilters([]);
  }, [reset]);

  useEffect(() => {
    if (colorFilters?.length) {
      if (colorFilters.includes("white")) setWhiteApplied(true);
      if (colorFilters.includes("blue")) setBlueApplied(true);
      if (colorFilters.includes("black")) setBlackApplied(true);
      if (colorFilters.includes("red")) setRedApplied(true);
      if (colorFilters.includes("green")) setGreenApplied(true);
      if (colorFilters.includes("gold")) setGoldApplied(true);
      if (colorFilters.includes("colorless")) setColorlessApplied(true);
      if (colorFilters.includes("mono")) setMonoColorApplied(true);
    } else {
      if (!preferences.filters) return;

      if (preferences.filters.colorFilter?.includes("white")) {
        setWhiteApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("blue")) {
        setBlueApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("black")) {
        setBlackApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("red")) {
        setRedApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("green")) {
        setGreenApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("gold")) {
        setGoldApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("colorless")) {
        setColorlessApplied(true);
      }
      if (preferences.filters.colorFilter?.includes("mono")) {
        setMonoColorApplied(true);
      }
    }
  }, [preferences, colorFilters]);

  const colorFiltersList = (
    <View className="flex flex-row flex-wrap gap-2">
      <Chip
        text="White"
        action="white"
        disabled={disabled}
        type={whiteApplied ? "default" : "outlined"}
        onClick={() => setWhiteApplied(!whiteApplied)}
      />

      <Chip
        text="Blue"
        action="blue"
        disabled={disabled}
        type={blueApplied ? "default" : "outlined"}
        onClick={() => setBlueApplied(!blueApplied)}
      />

      <Chip
        text="Black"
        action="black"
        disabled={disabled}
        type={blackApplied ? "default" : "outlined"}
        onClick={() => setBlackApplied(!blackApplied)}
      />

      <Chip
        text="Red"
        action="red"
        disabled={disabled}
        type={redApplied ? "default" : "outlined"}
        onClick={() => setRedApplied(!redApplied)}
      />

      <Chip
        text="Green"
        action="green"
        disabled={disabled}
        type={greenApplied ? "default" : "outlined"}
        onClick={() => setGreenApplied(!greenApplied)}
      />

      <Chip
        text="Gold"
        action="gold"
        disabled={disabled}
        type={goldApplied ? "default" : "outlined"}
        onClick={() => setGoldApplied(!goldApplied)}
      />

      <Chip
        text="Colorless"
        action="colorless"
        disabled={disabled}
        type={colorlessApplied ? "default" : "outlined"}
        onClick={() => setColorlessApplied(!colorlessApplied)}
      />

      {!excludeMono && (
        <Chip
          text="Mono"
          disabled={disabled}
          type={monoColorApplied ? "default" : "outlined"}
          onClick={() => setMonoColorApplied(!monoColorApplied)}
        />
      )}
    </View>
  );

  if (flat) return colorFiltersList;

  return (
    <View>
      <Chip type="outlined" text="Color" onClick={() => setExpanded(!expanded)}>
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
        {colorFiltersList}
      </Dropdown>
    </View>
  );
}
