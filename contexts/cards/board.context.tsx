import { createContext } from "react";

export type BoardType = "main" | "maybe" | "side" | "acquire";

const BoardContext = createContext({
  board: "main" as BoardType,
  setBoard: (board: BoardType) => {},
});

export default BoardContext;
