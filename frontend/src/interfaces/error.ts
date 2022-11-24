export interface TokenError {
    error: {
        response: {
            data: {
                isTokenProblem: boolean;
            };
        };
    };
}
