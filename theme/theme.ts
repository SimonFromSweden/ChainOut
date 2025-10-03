import { makeTheme } from "dripsy";

// Define Dripsy theme
export const theme = makeTheme({
   colors: {
      $primary: "#0070f3",
      $black: "#000",
      $white: "#fff",
      $lightGray: "#afbbaf",
      $barGray: "#5c5e53",
      $iconYellow: "#e4af1d",
      $darkGreen: "#102111",
      $lightGreen: "#17cf17",
      $clearGreen: "#78d43a",
      $forestGreen: "#3b962f",
      $midGreen: "#3c5d28",
      $dullGreen: "#405330",
      $buttonGreen: "#3e6d1d",
      $backgroundGreen: "#182210",
      $mattGreen: "#a0aea1",
      $greenFormText: "#576f59",
      $greenFormBg: "#293728",
      $mediumGreen: "#134311",
   },
   fonts: {
      root: "Nunito", // default font
      Nunito: "Nunito", // regular
      NunitoBold: "NunitoBold", // bold
      SpaceMono: "SpaceMono", // monospaced
   },
   text: {
      body: {
         fontSize: 16,
         color: "$text",
      },
      heading: {
         fontSize: 24,
         fontWeight: "bold",
         color: "$primary",
      },
   },
});
