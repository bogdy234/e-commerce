import { createContext, FC, useReducer } from "react";

import { RESET_SEARCH, SET_SEARCH } from "@constants/search";
import { Action, SearchContextType, SearchState } from "@interfaces/search";

interface SearchProviderProps {
    children: React.ReactNode;
}

// first make the token null to use as isLoading on require auth
const initialState: SearchState = {
    searchData: "",
};

const SearchContext = createContext<SearchContextType>({} as SearchContextType);

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_SEARCH: {
            return {
                ...state,
                ...action.payload,
            };
        }
        case RESET_SEARCH: {
            return {
                ...initialState,
                token: "",
            };
        }
        default: {
            throw new Error("Unhandled action type");
        }
    }
};

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <SearchContext.Provider value={{ state, dispatch }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchContext;
