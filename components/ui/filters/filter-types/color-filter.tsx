import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { MTGColor } from "../../../../constants/mtg/mtg-colors";
import Chip from "../../chip/chip";
import { Dropdown } from "../../dropdown/dropdown";

export interface ColorFilterProps {
  reset: boolean;
  setColorFilters: React.Dispatch<React.SetStateAction<MTGColor[]>>;
}

export default function ColorFilter({
  setColorFilters,
  reset,
}: ColorFilterProps) {
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

  return (
    <View>
      <Chip type="outlined" text="Color" onClick={() => setExpanded(!expanded)}>
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
            text="White"
            action="white"
            type={whiteApplied ? "default" : "outlined"}
            onClick={() => setWhiteApplied(!whiteApplied)}
          />

          <Chip
            text="Blue"
            action="blue"
            type={blueApplied ? "default" : "outlined"}
            onClick={() => setBlueApplied(!blueApplied)}
          />

          <Chip
            text="Black"
            action="black"
            type={blackApplied ? "default" : "outlined"}
            onClick={() => setBlackApplied(!blackApplied)}
          />

          <Chip
            text="Red"
            action="red"
            type={redApplied ? "default" : "outlined"}
            onClick={() => setRedApplied(!redApplied)}
          />

          <Chip
            text="Green"
            action="green"
            type={greenApplied ? "default" : "outlined"}
            onClick={() => setGreenApplied(!greenApplied)}
          />

          <Chip
            text="Gold"
            action="gold"
            type={goldApplied ? "default" : "outlined"}
            onClick={() => setGoldApplied(!goldApplied)}
          />

          <Chip
            text="Colorless"
            action="colorless"
            type={colorlessApplied ? "default" : "outlined"}
            onClick={() => setColorlessApplied(!colorlessApplied)}
          />

          <Chip
            text="Mono"
            type={monoColorApplied ? "default" : "outlined"}
            onClick={() => setMonoColorApplied(!monoColorApplied)}
          />
        </View>
      </Dropdown>
    </View>
  );
}
