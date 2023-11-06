const deviceSizes = {
  tablet: 1023,
  mobile: 767,
};

const DEVICE = {
  mobile: `screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `screen and (min-width: ${
    deviceSizes.mobile + 1
  }px) and (max-width: ${deviceSizes.tablet}px)`,
};

const COLORS = {
  primary: {
    blue: "#282190",
    navy: "#100D45",
    yellow: "#FFD02C",
    logo: "#232054",
  },
  font: "#0F0F0F",
  error: "#EC0707",
  white: "#FFFFFF",
  black: "#0F0F0F",
  gray: {
    100: "#F1F1F1",
    200: "#D9D9D9",
    300: "#C1C1C1",
    400: "#757575",
    500: "#5B5B5B",
  },
};

const FONT_SIZE = {
  extraSmall: "14px",
  small: "16px",
  medium: "18px",
  large: "20px",
  extraLarge: "32px",
};

const FONT_WEIGHT = {
  thin: 400,
  regular: 500,
  bold: 700,
};

const theme = {
  COLORS,
  FONT_SIZE,
  FONT_WEIGHT,
  DEVICE,
};
export default theme;
