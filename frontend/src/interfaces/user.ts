export interface User {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface UserLoginParams {
    email: string;
    password: string;
    remember: string;
}
