
// Configuration file for API base URL and token management

export const CONFIG = {
    BASE_URL: 'https://l5h8zbg5-5123.inc1.devtunnels.ms/',
    tokens: {
        access_token: null as string | null,
        refresh_token: null as string | null,
    },
    googleUser: null as any
};

export const setGoogleUser = (user: any) => {
    CONFIG.googleUser = user;
};

/**
 * Set authentication tokens globally
 * @param accessToken The access token string
 * @param refreshToken The refresh token string
 */

export const setTokens = (accessToken: string, refreshToken: string) => {
    CONFIG.tokens.access_token = accessToken;
    CONFIG.tokens.refresh_token = refreshToken;
};

// Mock loadTokens that always returns false since we can't persist
export const loadTokens = async () => {
    return false;
};

export const clearTokens = async () => {
    CONFIG.tokens.access_token = null;
    CONFIG.tokens.refresh_token = null;
};

/**
 * Get the current access token
 */
export const getAccessToken = () => {
    return CONFIG.tokens.access_token;
};

/**
 * Get the current refresh token
 */
export const getRefreshToken = () => {
    return CONFIG.tokens.refresh_token;
};
