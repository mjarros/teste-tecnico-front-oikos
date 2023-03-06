import { createContext, useContext } from "react";
import { utilsStore } from "./utilsStore";

const storesCtx = createContext(null);

export function useStores() {
  return useContext(storesCtx);
}

export function StoresProvider({ children }) {
  const generalStore = utilsStore();

  return (
    <storesCtx.Provider
      value={{
        generalStore,
      }}
    >
      {children}
    </storesCtx.Provider>
  );
}
