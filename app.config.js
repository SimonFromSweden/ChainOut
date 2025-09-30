import "dotenv/config";

export default ({ config }) => ({
   ...config,
   name: "ChainOut",
   slug: "ChainOut",
   version: "1.0.0",
   orientation: "portrait",
   icon: "./assets/images/icon.png",
   scheme: "chainout",
   userInterfaceStyle: "automatic",
   newArchEnabled: true,
   splash: {
      image: "./assets/images/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
   },
   ios: {
      supportsTablet: true,
      config: {
         googleMapsApiKey: process.env.GOOGLE_MAPS_IOS_KEY,
      },
   },
   android: {
      adaptiveIcon: {
         foregroundImage: "./assets/images/adaptive-icon.png",
         backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      predictiveBackGestureEnabled: false,
      config: {
         googleMaps: {
            apiKey: process.env.GOOGLE_MAPS_ANDROID_KEY,
         },
      },
   },
   web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
   },
   plugins: ["expo-router"],
   experiments: {
      typedRoutes: true,
   },
});
