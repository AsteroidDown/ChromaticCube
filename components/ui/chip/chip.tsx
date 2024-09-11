import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pressable, Text, ViewProps } from "react-native";
import { ActionColor } from "../../../constants/ui/colors";
import { Size } from "../../../constants/ui/sizes";

export type ChipType = "default" | "outlined";

export type ChipProps = ViewProps & {
  text?: string;
  type?: ChipType;
  size?: Size;
  action?: ActionColor;
  disabled?: boolean;

  startIcon?: IconProp;
  endIcon?: IconProp;

  onClick?: () => void;
};

export default function Chip({
  text,
  type = "default",
  size = "md",
  action = "primary",
  disabled = false,
  startIcon,
  endIcon,
  onClick,
  style,
  className,
  children,
}: ChipProps) {
  const baseColor = getChipBaseColor(action, type, disabled);
  const hoverColor = getChipHoverColor(action, type, disabled);
  const textColor = getChipTextColor(action, type, disabled);

  const chipHeight = getChipHeight(size);
  const chipTextSize = getChipTextSize(size);

  const baseChipClasses =
    "flex flex-row px-4 py-2 gap-2 justify-center items-center rounded-full transition-all";

  return (
    <Pressable
      style={style}
      className={`${className} ${baseChipClasses} ${baseColor} ${hoverColor} ${chipHeight}`}
      onPress={onClick}
    >
      {startIcon && (
        <FontAwesomeIcon
          icon={startIcon}
          className={`${textColor}`}
          size={size !== "md" ? size : undefined}
        />
      )}

      {text && (
        <Text className={`font-bold ${textColor} ${chipTextSize}`}>{text}</Text>
      )}

      {children}

      {endIcon && (
        <FontAwesomeIcon
          icon={endIcon}
          className={`${textColor}`}
          size={size !== "md" ? size : undefined}
        />
      )}
    </Pressable>
  );
}

function getChipBaseColor(
  action: ActionColor,
  type: ChipType,
  disabled: boolean
) {
  if (type === "outlined") {
    if (disabled) return "border-2 bg-dark-300 bg-opacity-30";

    return (
      "border-2 " +
      (action === "primary"
        ? "border-primary-300"
        : action === "secondary"
        ? "border-secondary-200"
        : action === "success"
        ? "border-success-200"
        : action === "danger"
        ? "border-danger-200"
        : action === "info"
        ? "border-info-200"
        : "border-warning-200")
    );
  } else {
    if (disabled) return "bg-dark-300";

    return action === "primary"
      ? "bg-primary-300"
      : action === "secondary"
      ? "bg-secondary-200"
      : action === "success"
      ? "bg-success-200"
      : action === "danger"
      ? "bg-danger-200"
      : action === "info"
      ? "bg-info-200"
      : "bg-warning-200";
  }
}

function getChipHoverColor(
  action: ActionColor,
  type: ChipType,
  disabled: boolean
) {
  if (disabled) return;

  return `${type !== "default" ? "hover:bg-opacity-30" : ""} ${
    action === "primary"
      ? "hover:bg-primary-200"
      : action === "secondary"
      ? "hover:bg-secondary-100"
      : action === "success"
      ? "hover:bg-success-100"
      : action === "danger"
      ? "hover:bg-danger-100"
      : action === "info"
      ? "hover:bg-info-100"
      : "hover:bg-warning-100"
  }`;
}

function getChipTextColor(
  action: ActionColor,
  type: ChipType,
  disabled: boolean
) {
  if (disabled) return "text-dark-600";

  return `${
    type === "default"
      ? "text-dark-100"
      : action === "primary"
      ? "text-primary-200"
      : action === "secondary"
      ? "text-secondary-100"
      : action === "success"
      ? "text-success-100"
      : action === "danger"
      ? "text-danger-100"
      : action === "info"
      ? "text-info-100"
      : "text-warning-100"
  }`;
}

function getChipHeight(size: Size) {
  return size === "xs"
    ? "h-6"
    : size === "sm"
    ? "h-8"
    : size === "md"
    ? "h-10"
    : size === "lg"
    ? "h-12"
    : "h-14";
}

function getChipTextSize(size: Size) {
  return size === "xs"
    ? "text-xs"
    : size === "sm"
    ? "text-sm"
    : size === "md"
    ? "text-base"
    : size === "lg"
    ? "text-lg"
    : "text-xl";
}
