import { BsFileEarmark, BsTerminal, BsBraces } from "react-icons/bs";
import { SiReact, SiTypescript } from "react-icons/si";

export const getCodeIcon = (language: string = "text") => {
  let Icon = BsFileEarmark;

  switch (language) {
    case "tsx":
      Icon = SiReact;
      break;
    case "typescript":
      Icon = SiTypescript;
      break;
    case "sh":
      Icon = BsTerminal;
      break;
    case "json":
      Icon = BsBraces;
      break;
  }

  return Icon;
};
