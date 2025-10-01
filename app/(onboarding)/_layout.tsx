import { Stack } from "expo-router";

export default function OnboardingLayout() {
   return (
      <Stack
         screenOptions={{
            headerShown: false,
            headerStyle: { backgroundColor: "#102111" },
         }}>
         <Stack.Screen name="page1" />
         <Stack.Screen name="page2" />
         <Stack.Screen name="index" />
      </Stack>
   );
}
