import { useHealthQuery } from "@/hooks/useQuery";
import { Button, Text, View } from "react-native";

export default function SettingsScreen() {
   const { data, isFetching, error, refetch } = useHealthQuery();

   return (
      <View style={{ padding: 20 }}>
         <Button title="Fetch Health Data" onPress={() => refetch()} />

         {isFetching && <Text>Loading...</Text>}
         {error && <Text>Error: {(error as Error).message}</Text>}
         {data && <Text>{JSON.stringify(data, null, 2)}</Text>}
      </View>
   );
}
