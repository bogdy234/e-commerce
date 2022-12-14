import { createContext, FC, useReducer } from "react";

import { RESET_USER, SET_USER } from "@constants/user";
import { Action, UserContextType, UserState } from "@interfaces/user";

interface UserProviderProps {
    children: React.ReactNode;
}

// first make the token null to use as isLoading on require auth
const initialState: UserState = {
    user: null,
    token: null
};

const UserContext = createContext<UserContextType>({} as UserContextType);

const userReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SET_USER: {
            return {
                ...state,
                ...action.payload
            };
        }
        case RESET_USER: {
            return {
                ...initialState,
                token: ""
            };
        }
        default: {
            throw new Error("Unhandled action type");
        }
    }
};

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{ state, dispatch }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
