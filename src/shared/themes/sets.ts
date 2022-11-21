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
import {INPUT_MIN_HEIGHT} from '../../constants';

// PALETTES

export const additionalPalette = {
  info: INFO_COLOR,
  success: SUCCESS_COLOR,
  warning: WARNING_COLOR,
  error: ERROR_COLOR,
  // COLOR
  turquoise: TURQUOISE_COLOR,
  yellow: YELLOW_COLOR,
  purple: PURPLE_COLOR,
  green: GREEN_COLOR,
  blue: BLUE_COLOR,
};

export const turquoisePalette = {
  ...additionalPalette,
  primary: TURQUOISE_COLOR,
  secondary: YELLOW_COLOR,
};

export const yellowPalette = {
  ...additionalPalette,
  primary: YELLOW_COLOR,
  secondary: TURQUOISE_COLOR,
};

export const purplePalette = {
  ...additionalPalette,
  primary: PURPLE_COLOR,
  secondary: YELLOW_COLOR,
};

export const greenPalette = {
  ...additionalPalette,
  primary: GREEN_COLOR,
  secondary: YELLOW_COLOR,
};

export const bluePalette = {
  ...additionalPalette,
  primary: BLUE_COLOR,
  secondary: YELLOW_COLOR,
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
      italic: 'Roboto-RegularItalic',
    },
    500: {
      normal: 'Roboto-Regular',
      italic: 'Roboto-RegularItalic',
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

// COMPONENTS

export const components = {
  Text: {
    defaultProps: {
      fontSize: 'md',
    },
  },
  TextArea: {
    defaultProps: {
      fontSize: 'md',
      borderRadius: 'xl',
      height: INPUT_MIN_HEIGHT * 3,
    },
  },
  Input: {
    defaultProps: {
      fontSize: 'md',
      borderRadius: 'xl',
      minHeight: INPUT_MIN_HEIGHT,
    },
  },
  Button: {
    defaultProps: {
      size: 'md',
      borderRadius: 'xl',
    },
  },
};

// CONFIGS

export const config = {
  initialColorMode: 'light',
};
