import {
  BLUE_COLOR,
  ERROR_COLOR,
  GREEN_COLOR,
  INFO_COLOR,
  PURPLE_COLOR,
  SUCCESS_COLOR,
  TURQUOISE_COLOR,
  WARNING_COLOR,
  YELLOW_COLOR,
} from './colors';

// PALETTES

export const additionalPalette = {
  info: INFO_COLOR,
  success: SUCCESS_COLOR,
  warning: WARNING_COLOR,
  error: ERROR_COLOR,
};

export const yellowPalette = {
  ...additionalPalette,
  primary: TURQUOISE_COLOR,
  secondary: YELLOW_COLOR,
  tertiary: YELLOW_COLOR,
};

export const turquoisePalette = {
  ...additionalPalette,
  primary: TURQUOISE_COLOR,
  secondary: YELLOW_COLOR,
  tertiary: TURQUOISE_COLOR,
};

export const purplePalette = {
  ...additionalPalette,
  primary: PURPLE_COLOR,
  secondary: YELLOW_COLOR,
  tertiary: PURPLE_COLOR,
};

export const greenPalette = {
  ...additionalPalette,
  primary: GREEN_COLOR,
  secondary: YELLOW_COLOR,
  tertiary: GREEN_COLOR,
};

export const bluePalette = {
  ...additionalPalette,
  primary: BLUE_COLOR,
  secondary: YELLOW_COLOR,
  tertiary: BLUE_COLOR,
};

// FONTS

export const fontConfig = {
  Roboto: {
    100: {
      normal: 'Roboto-Light',
      italic: 'Roboto-LightItalic',
    },
    200: {
      normal: 'Roboto-Light',
      italic: 'Roboto-LightItalic',
    },
    300: {
      normal: 'Roboto-Light',
      italic: 'Roboto-LightItalic',
    },
    400: {
      normal: 'Roboto-Regular',
      italic: 'Roboto-Italic',
    },
    500: {
      normal: 'Roboto-Regular',
      italic: 'Roboto-Italic',
    },
    600: {
      normal: 'Roboto-Medium',
      italic: 'Roboto-MediumItalic',
    },
    700: {
      normal: 'Roboto-Medium',
      italic: 'Roboto-MediumItalic',
    },
    800: {
      normal: 'Roboto-Bold',
      italic: 'Roboto-BoldItalic',
    },
    900: {
      normal: 'Roboto-Bold',
      italic: 'Roboto-BoldItalic',
    },
  },
};

export const fonts = {
  heading: 'Roboto',
  body: 'Roboto',
  mono: 'Roboto',
};

// CONFIGS

export const lightConfig = {
  initialColorMode: 'light',
};

export const darkConfig = {
  initialColorMode: 'dark',
};
