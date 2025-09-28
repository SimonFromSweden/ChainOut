import { View } from "dripsy";
import { useRouter } from "expo-router";
import { Button, Text } from "react-native";
import { useHealthMutation } from "../../hooks/useHealthMutation";

export default function SettingsScreen() {
   const router = useRouter();
   const mutation = useHealthMutation();
   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#102111",
         }}>
         {mutation.isPending && <Text>Sending...</Text>}
         {mutation.isError && (
            <Text>Error: {(mutation.error as Error).message}</Text>
         )}
         {mutation.isSuccess && (
            <Text>Success: {JSON.stringify(mutation.data)}</Text>
         )}

         <Button
            title="Send Health Data"
            onPress={() => mutation.mutate({ data: "Hej på dig!" })}
         />
      </View>
   );
}
