export interface SearchState {
    searchData: string;
}

export type SearchActionTypes = "SET_SEARCH" | "RESET_SEARCH";

export interface Action {
    type: SearchActionTypes;
    payload?: SearchState;
}

export type Dispatch = (action: Action) => void;

export interface SearchContextType {
    state: SearchState | null;
    dispatch: Dispatch;
}
