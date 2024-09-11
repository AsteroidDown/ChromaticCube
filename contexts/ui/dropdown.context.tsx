import { createContext } from "react";

const DropdownContext = createContext({
  expanded: false,
  setExpanded: (value: boolean) => {},
});

export default DropdownContext;
