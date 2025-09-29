import AsyncStorage from "@react-native-async-storage/async-storage";

export const setHasOnboarded = async () => {
   try {
      await AsyncStorage.setItem("hasOnboarded", "true");
   } catch (e) {
      console.error("Error setting onboarding flag:", e);
   }
};

export const getHasOnboarded = async (): Promise<boolean> => {
   try {
      const value = await AsyncStorage.getItem("hasOnboarded");
      return value === "true";
   } catch (e) {
      console.error("Error reading onboarding flag:", e);
      return false;
   }
};

export const resetOnboarding = async () => {
   try {
      await AsyncStorage.removeItem("hasOnboarded");
   } catch (e) {
      console.error("Error resetting onboarding flag:", e);
   }
};
