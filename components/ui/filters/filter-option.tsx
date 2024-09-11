import React from "react";
import { ViewProps } from "react-native";
import { ActionColor } from "../../../constants/ui/colors";
import Chip from "../chip/chip";

export type FilterOptionProps = ViewProps & {
  title: string;

  applied: boolean;
  applyFilter: React.Dispatch<React.SetStateAction<boolean>>;

  action?: ActionColor;
};

export default function FilterOption({
  title,
  applied,
  applyFilter,
  action = "primary",
  className,
  style,
}: FilterOptionProps) {
  return (
    <Chip
      text={title}
      style={style}
      action={action}
      className={className}
      type={applied ? "default" : "outlined"}
      onClick={() => applyFilter(!applied)}
    />
  );
}
