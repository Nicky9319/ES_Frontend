import { createContext } from "react";

export const PersonaContext = createContext({
  persona: "user", // Default persona
  setPersona: () => {},
});
