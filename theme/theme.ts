import { makeTheme } from "dripsy";

// 1. Define your theme object
export const theme = makeTheme({
   colors: {
      darkGreen: "#102111",
      greenFormBg: "#1a2e1a",
      greenFormText: "#d8f3dc",
      lightGray: "#aaa",
      white: "#ffffff",
   },
   text: {
      body: {
         fontSize: 16,
         color: "white",
         fontFamily: "Nunito",
      },
      heading: {
         fontSize: 32,
         fontFamily: "NunitoBold",
         color: "white",
      },
   },
});

// 2. Extend Dripsy’s types so TS knows about your custom tokens
type MyColors = typeof theme.colors;

declare module "dripsy" {
   interface DripsyCustomTheme {
      colors: MyColors;
   }
}
