import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pressable, Text, View, ViewProps } from "react-native";
import { ActionColor } from "../../../constants/colors";

export type ButtonProps = ViewProps & {
  text?: string;
  icon?: IconProp;
  action?: ActionColor;
  disabled?: boolean;
  onClick?: () => void;
};

export default function Button({
  text,
  icon,
  action = "primary",
  onClick,
  children,
  disabled = false,
}: ButtonProps) {
  const baseColor =
    action === "primary"
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

  const hoverColor =
    action === "primary"
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

  return (
    <Pressable onPress={onClick} disabled={disabled}>
      <View
        className={
          "flex flex-row px-4 py-2 gap-2 justify-center items-center w-full h-10 rounded-md transition-all " +
          (disabled ? "bg-dark-300" : baseColor + " " + hoverColor)
        }
      >
        {icon && (
          <FontAwesomeIcon
            size="lg"
            icon={icon}
            className={disabled ? "text-dark-600" : "text-dark-100"}
          />
        )}

        {text && (
          <Text
            className={
              "text-base font-bold " +
              (disabled ? "text-dark-600" : "text-dark-100")
            }
          >
            {text}
          </Text>
        )}

        {children}
      </View>
    </Pressable>
  );
}
