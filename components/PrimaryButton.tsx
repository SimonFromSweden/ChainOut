import { theme } from "@/theme/theme";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PrimaryButtonProps = {
   title: string;
   onPress?: () => void;
   backgroundColor?: keyof typeof theme.colors | (string & {});
   disabled?: boolean;
};

export default function PrimaryButton({
   title,
   onPress,
   backgroundColor = "#17cf17",
   disabled = false,
}: PrimaryButtonProps) {
   const bgColor =
      (backgroundColor in theme.colors
         ? theme.colors[backgroundColor as keyof typeof theme.colors]
         : backgroundColor) ?? "#17cf17";

   return (
      <TouchableOpacity
         style={[
            styles.button,
            {
               backgroundColor: disabled ? "#666" : bgColor,
               opacity: disabled ? 0.6 : 1,
            },
         ]}
         onPress={onPress}
         disabled={disabled}
         activeOpacity={0.8}>
         <Text style={styles.text}>{title}</Text>
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
      color: "white",
      fontWeight: "600",
      fontSize: 16,
   },
});
