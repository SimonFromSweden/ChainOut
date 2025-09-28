import { Text, View } from "dripsy";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
   const router = useRouter();
   return (
      <View
         sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            bg: "$background",
         }}>
         <Text
            sx={{
               fontSize: 36,
               fontWeight: "bold",
               color: "$white",
            }}>
            Settings
         </Text>
         {/* <Button
            title="Go to Details"
            onPress={() => router.push("/(tabs)/settingsTab/details")}
         /> */}
      </View>
   );
}
