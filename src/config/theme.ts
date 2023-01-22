import { Colors, ThemeManager } from "react-native-ui-lib";

const primary = "#c183de";

Colors.loadColors({
  buttonBG: primary,
  mainBG: "#fff",
  primaryBG: primary,
  postBG: "#fff",
  replyBG: "#fafafa",
  postInputModalBG: "#fff",
  heart: "#d1b9dd",
  tabBarBG: "white",
  postInputBG: "white",
  bannerBG: "#d1b9dd",
  tabBarIcon: primary,
  tabBarIconActive: primary,
  lightIcon: Colors.$textNeutralLight,
});

ThemeManager.setComponentTheme("Button", {
  ["bg-buttonBG"]: true,
});