import { Text, View } from "dripsy";
import { useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";

export default function OnboardingPage1() {
   const router = useRouter();

   return (
      <View
         sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "start",
            backgroundColor: "#102111",
         }}>
         <Text>Welcome to Page 1</Text>
         <TouchableOpacity onPress={() => router.push("/(onboarding)/page2")}>
            <Text>Next</Text>
         </TouchableOpacity>
      </View>
   );
}
