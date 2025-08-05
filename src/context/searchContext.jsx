import { createContext, useState, useContext } from "react";

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);
export function SearchProvider({ children }) {
  const [inputSearch, setInputSearch] = useState("");
  return (
    <SearchContext.Provider value={{ inputSearch, setInputSearch }}>
      {children}
    </SearchContext.Provider>
  );
}
