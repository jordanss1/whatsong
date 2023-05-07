import { ReactNode } from "react";
import SearchContext, { UseSearchStateContext } from "./SearchState";
import { SearchState } from "./SearchState";

export const SearchStore = ({ children }: { children: ReactNode }) => {
  const providerValues: UseSearchStateContext = { ...SearchState() };

  return (
    <SearchContext.Provider value={providerValues}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
