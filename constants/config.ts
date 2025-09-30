import Constants from "expo-constants";

type ExtraConfig = {
   apiBaseUrl: string;
};

const extra = Constants.expoConfig?.extra as ExtraConfig;

if (!extra?.apiBaseUrl) {
   throw new Error("apiBaseUrl is missing in app.config.js/.env.local");
}

export const CONFIG = {
   apiBaseUrl: extra.apiBaseUrl,
};
