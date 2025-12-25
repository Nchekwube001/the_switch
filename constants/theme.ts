import { lightThemeColors } from "./colors";
import { scale } from "./scale";

const lightTheme = {
  colors: {
    ...lightThemeColors,
  },
  spacing: {
    xxs: scale(4),
    xs: scale(6),
    s: scale(8),
    m: scale(10),
    mm: scale(12),
    mmm: scale(14),
    l: scale(16),
  },
  gap: (v: number) => v * 8,
  textVariants: {
    header: {
      fontWeight: "bold",
      fontSize: scale(34),
      lineHeight: scale(42.5),
    },
    subheader: {
      fontWeight: "600",
      fontSize: scale(28),
      lineHeight: scale(36),
    },
    body: {
      fontSize: scale(16),
      lineHeight: scale(24),
    },
    normal: {
      fontSize: scale(13),
      lineHeight: scale(16),
    },
  },
  breakpoints: {
    phone: 0,
    longPhone: {
      width: 0,
      height: 812,
    },
    tablet: 768,
    largeTablet: 1024,
  },
};

export type Theme = typeof lightTheme;
export default { lightTheme };
