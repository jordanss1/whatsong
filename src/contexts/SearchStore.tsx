import { type ReactNode } from 'react';
import SearchContext, {
  SearchState,
  type UseSearchStateContext,
} from './SearchState';

export const SearchStore = ({ children }: { children: ReactNode }) => {
  const providerValues: UseSearchStateContext = { ...SearchState() };

  return (
    <SearchContext.Provider value={providerValues}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
