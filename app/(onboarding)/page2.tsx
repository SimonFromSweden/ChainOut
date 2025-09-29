import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

export default function OnboardingPage1() {
   const router = useRouter();

   return (
      <View>
         <Text>Welcome to Page 2</Text>
         <TouchableOpacity onPress={() => router.push("/(onboarding)")}>
            <Text>Next</Text>
         </TouchableOpacity>
      </View>
   );
}
