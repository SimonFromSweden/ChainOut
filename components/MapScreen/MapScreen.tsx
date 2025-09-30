import { StyleSheet, View } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
const snazzyStyle = require("./snazzyStyle118475.json");

export default function MapScreen() {
   return (
      <View style={styles.container}>
         <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE} // ensures Google Maps on iOS too
            customMapStyle={snazzyStyle}
            initialRegion={{
               latitude: 55.607296, // Malmö, Sweden
               longitude: 13.0449408,
               latitudeDelta: 0.1,
               longitudeDelta: 0.1,
            }}>
            <Marker
               coordinate={{ latitude: 37.7749, longitude: -122.4194 }}
               title="San Francisco"
               description="Hello from Snazzy Maps!"
            />
         </MapView>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   map: {
      flex: 1,
   },
});
