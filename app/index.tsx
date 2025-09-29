import { Redirect } from "expo-router";

export default function RootIndex() {
   // Later you can add AsyncStorage logic here
   return <Redirect href="/(onboarding)" />;
}
