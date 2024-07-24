import { PixelRatio } from "react-native";
const fontScale = PixelRatio.getFontScale();
export const SIZES = {
  small: 9 * fontScale,
  medium: 14 * fontScale,
  large: 18 * fontScale,
  xLarge: 24 * fontScale,
};
export const COLORS = {
  bg: "#fff",
  cardBg: "#1F2937",
  second: "#156EB2",
  white: "#FFF",
  black: "#000",
  gray: "#ddd",
  grey: '#5E5D5E',
  dark: '#1A1A1A',
  lightGrey:'white#D3D3D3',
  primary: '#FF385C',
};
export const FONTS = {
//   bold: "InterBold",
//   semiBold: "InterSemiBold",
//   medium: "InterMedium",
//   regular: "InterRegular",
//   light: "InterLight",
};