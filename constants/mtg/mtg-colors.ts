export type MTGColor =
  | "white"
  | "blue"
  | "black"
  | "red"
  | "green"
  | "gold"
  | "colorless"
  | "land"
  | "mono";

export type MTGColorSymbol = "W" | "U" | "B" | "R" | "G" | "M" | "C" | "1";

export const MTGColorMap = new Map<MTGColor, MTGColorSymbol>([
  ["white", "W"],
  ["blue", "U"],
  ["black", "B"],
  ["red", "R"],
  ["green", "G"],
  ["gold", "M"],
  ["colorless", "C"],
  ["mono", "1"],
]);
