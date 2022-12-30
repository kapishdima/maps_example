const TOKEN_KEY_NAME = "auth_token";

export class AuthToken {
    constructor() {}

    public save(token: string) {
        localStorage.setItem(TOKEN_KEY_NAME, token);
    }

    public read() {
        return localStorage.getItem(TOKEN_KEY_NAME);
    }

    public clear() {
        localStorage.removeItem(TOKEN_KEY_NAME);
    }
}
