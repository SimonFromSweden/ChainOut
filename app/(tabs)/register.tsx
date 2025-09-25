import { Text, View } from "dripsy";
import { Stack } from "expo-router";

export default function HomeScreen() {
   return (
      <>
         <Stack.Screen
            options={{ title: "Home", headerTitleAlign: "center" }}
         />
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
               Register
            </Text>
         </View>
      </>
   );
}
