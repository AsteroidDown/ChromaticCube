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

export enum MTGColors {
  WHITE = "white",
  BLUE = "blue",
  BLACK = "black",
  RED = "red",
  GREEN = "green",
  GOLD = "gold",
  COLORLESS = "colorless",
  LAND = "land",
}

export type MTGColorSymbol = "W" | "U" | "B" | "R" | "G" | "M" | "C" | "1";

export enum MTGColorSymbols {
  WHITE = "W",
  BLUE = "U",
  BLACK = "B",
  RED = "R",
  GREEN = "G",
  GOLD = "M",
  COLORLESS = "C",
  MONO = "1",
}

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
