import { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [includeAdult, setIncludeAdult] = useState(false);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, includeAdult, setIncludeAdult }}
    >
      {children}
    </SearchContext.Provider>
  );
};
