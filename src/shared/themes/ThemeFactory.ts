import {
  bluePalette,
  components,
  config,
  fontConfig,
  fonts,
  greenPalette,
  purplePalette,
  turquoisePalette,
  yellowPalette,
} from './sets';
import {extendTheme, Theme} from 'native-base';

export const colorSchemes: ColorScheme[] = ['turquoise', 'yellow', 'purple', 'green', 'blue'];

export type ColorScheme = 'turquoise' | 'yellow' | 'purple' | 'green' | 'blue';

export const LINEAR_GRADIENT = {
  linearGradient: {
    colors: ['primary.400', 'primary.300'],
    start: [0, 1],
    end: [1, 0],
  },
};

export const LINEAR_ERROR_GRADIENT = {
  linearGradient: {
    colors: ['error.400', 'error.300'],
    start: [0, 1],
    end: [1, 0],
  },
};

export const LINEAR_GRADIENT_FUNC = (theme: Theme) => ({
  linearGradient: {
    colors: [theme.colors.primary['400'], theme.colors.primary['300']],
    start: [0, 1],
    end: [1, 0],
  },
});

export class ThemeFactory {
  private static turquoiseTheme = extendTheme({
    colors: turquoisePalette,
    fontConfig,
    fonts,
    components,
    config,
  });

  private static yellowTheme = extendTheme({
    colors: yellowPalette,
    fontConfig,
    fonts,
    components,
    config,
  });

  private static purpleTheme = extendTheme({
    colors: purplePalette,
    fontConfig,
    fonts,
    components,
    config,
  });

  private static greenTheme = extendTheme({
    colors: greenPalette,
    fontConfig,
    fonts,
    components,
    config,
  });

  private static blueTheme = extendTheme({
    colors: bluePalette,
    fontConfig,
    fonts,
    components,
    config,
  });

  public static getDefaultTheme = (): Theme => ThemeFactory.turquoiseTheme;

  public static getTheme = (color: ColorScheme): Theme => {
    switch (color) {
      case 'turquoise':
        return ThemeFactory.turquoiseTheme;
      case 'yellow':
        return ThemeFactory.yellowTheme;
      case 'purple':
        return ThemeFactory.purpleTheme;
      case 'green':
        return ThemeFactory.greenTheme;
      case 'blue':
        return ThemeFactory.blueTheme;
      default:
        return ThemeFactory.getDefaultTheme();
    }
  };
}
