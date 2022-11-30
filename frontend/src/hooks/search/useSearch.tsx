import SearchContext from "contexts/SearchProvider";
import { useContext } from "react";

const useSearch = () => useContext(SearchContext);

export default useSearch;
