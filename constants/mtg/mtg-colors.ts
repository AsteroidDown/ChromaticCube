export type MTGColor =
  | "white"
  | "blue"
  | "black"
  | "red"
  | "green"
  | "gold"
  | "colorless"
  | "land";

export type MTGColorSymbol = "W" | "U" | "B" | "R" | "G" | "M" | "C";

export const MTGColorMap = new Map<MTGColor, MTGColorSymbol>([
  ["white", "W"],
  ["blue", "U"],
  ["black", "B"],
  ["red", "R"],
  ["green", "G"],
  ["colorless", "C"],
  ["gold", "M"],
]);
