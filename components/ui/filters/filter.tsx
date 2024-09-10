import React from "react";
import { ViewProps } from "react-native";
import { ActionColor } from "../../../constants/ui/colors";
import Chip from "../chip/chip";

export type FilterProps = ViewProps & {
  text: string;

  applied: boolean;
  applyFilter: React.Dispatch<React.SetStateAction<boolean>>;

  action?: ActionColor;
};

export default function Filter({
  text,
  applied,
  applyFilter,
  action = "primary",
  className,
  style,
}: FilterProps) {
  return (
    <Chip
      style={style}
      className={className}
      text={text}
      action={action}
      type={applied ? "default" : "outlined"}
      onClick={() => applyFilter(!applied)}
    />
  );
}
