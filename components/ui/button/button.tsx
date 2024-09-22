import { ActionColor } from "@/constants/ui/colors";
import { Size } from "@/constants/ui/sizes";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pressable, Text, View, ViewProps } from "react-native";

export type ButtonType = "default" | "outlined" | "clear";

export type ButtonProps = ViewProps & {
  text?: string;
  icon?: IconProp;
  action?: ActionColor;
  size?: Size;
  type?: ButtonType;
  rounded?: boolean;

  hideLeftBorder?: boolean;
  hideRightBorder?: boolean;

  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  text,
  icon,
  className,
  action = "primary",
  size = "md",
  type = "default",
  onClick,
  children,
  hideLeftBorder = false,
  hideRightBorder = false,
  rounded = false,
  disabled = false,
}: ButtonProps) {
  const baseColor = getButtonBaseColor(action, type, disabled);
  const hoverColor = getButtonHoverColor(action, type, disabled);
  const textColor = getButtonTextColor(action, type, disabled);

  const buttonHeight = getButtonHeight(size);
  const buttonTextSize = getButtonTextSize(size);

  const baseButtonClasses =
    "flex flex-row px-4 py-2 justify-center items-center w-full rounded-md transition-all";

  return (
    <Pressable className={className} onPress={onClick} disabled={disabled}>
      <View
        className={`${baseButtonClasses} ${buttonHeight}
          ${baseColor} ${hoverColor} ${
          rounded && text
            ? "!rounded-full"
            : rounded
            ? "!rounded-full !w-10 !h-10"
            : ""
        } ${hideLeftBorder ? "!rounded-l-none !border-l-0" : ""} ${
          hideRightBorder ? "!rounded-r-none !border-r-0" : ""
        }`}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className={`${textColor} ${text || children ? "mr-2" : ""} ${
              icon === faRotate ? "animate-spin" : ""
            }`}
            size={size !== "md" ? size : undefined}
          />
        )}

        {text && (
          <Text
            className={`font-bold ${buttonTextSize} ${textColor} ${
              children ? "mr-2" : ""
            }`}
          >
            {text}
          </Text>
        )}

        {children}
      </View>
    </Pressable>
  );
}

function getButtonBaseColor(
  action: ActionColor,
  type: ButtonType,
  disabled: boolean
) {
  if (type === "clear") return "";
  else if (type === "outlined") {
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

function getButtonHoverColor(
  action: ActionColor,
  type: ButtonType,
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

function getButtonTextColor(
  action: ActionColor,
  type: ButtonType,
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

function getButtonHeight(size: Size) {
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

function getButtonTextSize(size: Size) {
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
