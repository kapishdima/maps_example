export const apiConfig = {
    baseURL:
        process.env.MIX_ENV === "development"
            ? process.env.MIX_DEV_APP_URL
            : process.env.MIX_PROD_API_URL,
};
