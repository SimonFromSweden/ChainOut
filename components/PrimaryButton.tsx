import { theme } from "@/theme/theme";
import {
   ActivityIndicator,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from "react-native";

type PrimaryButtonProps = {
   title: string;
   loadingTitle?: string;
   onPress?: () => void;
   backgroundColor?: keyof typeof theme.colors | (string & {});
   textColor?: keyof typeof theme.colors | (string & {});
   loading?: boolean;
   disabled?: boolean;
};

export default function PrimaryButton({
   title,
   loadingTitle = title,
   onPress,
   backgroundColor = "#17cf17",
   textColor = "#ffffff",
   loading = false,
   disabled = false,
}: PrimaryButtonProps) {
   const bgColor =
      (backgroundColor in theme.colors
         ? theme.colors[backgroundColor as keyof typeof theme.colors]
         : backgroundColor) ?? "#17cf17";
   const txtColor =
      (textColor in theme.colors
         ? theme.colors[textColor as keyof typeof theme.colors]
         : textColor) ?? "#ffffff";

   return (
      <TouchableOpacity
         style={[
            styles.button,
            {
               backgroundColor: disabled ? "#666" : bgColor,
               opacity: disabled || loading ? 0.6 : 1,
            },
         ]}
         onPress={onPress}
         disabled={disabled || loading}
         activeOpacity={0.8}>
         {loading ? (
            <View
               style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
               }}>
               <ActivityIndicator color={txtColor} style={{ marginRight: 8 }} />
               <Text style={[styles.text, { color: txtColor }]}>
                  {loadingTitle}
               </Text>
            </View>
         ) : (
            <Text style={[styles.text, { color: txtColor }]}>{title}</Text>
         )}
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      padding: 16,
      borderRadius: 8,
      marginTop: 20,
      width: "80%",
      alignItems: "center",
   },
   text: {
      fontWeight: "600",
      fontSize: 16,
   },
});
