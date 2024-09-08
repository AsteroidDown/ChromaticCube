import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pressable, Text, View, ViewProps } from "react-native";
import { ActionColor } from "../../../constants/colors";
import { Size } from "../../../constants/sizes";

export type ButtonProps = ViewProps & {
  text?: string;
  icon?: IconProp;
  action?: ActionColor;
  size?: Size;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  text,
  icon,
  className,
  action = "primary",
  size = "md",
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const baseColor = getButtonBaseColor(action);
  const hoverColor = getButtonHoverColor(action);

  const buttonHeight = getButtonHeight(size);
  const buttonTextSize = getButtonTextSize(size);

  return (
    <Pressable className={className} onPress={onClick} disabled={disabled}>
      <View
        className={`flex flex-row px-4 py-2 gap-2 justify-center items-center w-full rounded-md transition-all ${buttonHeight}
          ${disabled ? "bg-dark-300" : baseColor + " " + hoverColor}`}
      >
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            size={size !== "md" ? size : undefined}
            className={disabled ? "text-dark-600" : "text-dark-100"}
          />
        )}

        {text && (
          <Text
            className={`
               font-bold ${buttonTextSize}
              ${disabled ? "text-dark-600" : "text-dark-100"}`}
          >
            {text}
          </Text>
        )}

        {children}
      </View>
    </Pressable>
  );
}

function getButtonBaseColor(action: ActionColor) {
  return action === "primary"
    ? "bg-primary-300"
    : action === "secondary"
    ? "bg-secondary-300"
    : action === "success"
    ? "bg-success-300"
    : action === "danger"
    ? "bg-danger-200"
    : action === "info"
    ? "bg-info-300"
    : "bg-warning-300";
}

function getButtonHoverColor(action: ActionColor) {
  return action === "primary"
    ? "hover:bg-primary-200"
    : action === "secondary"
    ? "hover:bg-secondary-200"
    : action === "success"
    ? "hover:bg-success-200"
    : action === "danger"
    ? "hover:bg-danger-100"
    : action === "info"
    ? "hover:bg-info-200"
    : "hover:bg-warning-200";
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
