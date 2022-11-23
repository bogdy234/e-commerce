export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
    registered_date: string;
    role: {
        rid: number;
        role_name: string;
    };
    vat: string;
}

export interface UserLoginParams {
    email: string;
    password: string;
    remember: string;
}

export interface UserActions {
    createUser: (data: User) => Promise<User>;
    loginUser: (data: UserLoginParams) => Promise<User>;
    getUserData: (token: string) => Promise<User>;
}

export type UserActionTypes = "SET_USER" | "RESET_USER";

export interface UserState {
    user: User | null;
    token: string | null;
}

export interface Action {
    type: UserActionTypes;
    payload?: UserState;
}

export type Dispatch = (action: Action) => void;

export interface UserContextType {
    state: UserState | null;
    dispatch: Dispatch;
}
