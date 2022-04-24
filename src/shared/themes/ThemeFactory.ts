import {
  bluePalette,
  fontConfig,
  fonts,
  greenPalette,
  lightConfig,
  purplePalette,
  turquoisePalette,
  yellowPalette,
} from './sets';
import {extendTheme, Theme} from 'native-base';

export const colorSchemes: ColorScheme[] = ['yellow', 'turquoise', 'purple', 'green', 'blue'];

export type ColorScheme = 'yellow' | 'turquoise' | 'purple' | 'green' | 'blue';

export const LINEAR_GRADIENT = {
  linearGradient: {
    colors: ['tertiary.500', 'tertiary.300'],
    start: [0, 0],
    end: [1, 1],
  },
};

export class ThemeFactory {
  private static yellowTheme = extendTheme({
    colors: yellowPalette,
    fontConfig: fontConfig,
    fonts: fonts,
    config: lightConfig,
  });

  private static turquoiseTheme = extendTheme({
    colors: turquoisePalette,
    fontConfig: fontConfig,
    fonts: fonts,
    config: lightConfig,
  });

  private static purpleTheme = extendTheme({
    colors: purplePalette,
    fontConfig: fontConfig,
    fonts: fonts,
    config: lightConfig,
  });

  private static greenTheme = extendTheme({
    colors: greenPalette,
    fontConfig: fontConfig,
    fonts: fonts,
    config: lightConfig,
  });

  private static blueTheme = extendTheme({
    colors: bluePalette,
    fontConfig: fontConfig,
    fonts: fonts,
    config: lightConfig,
  });

  public static getDefaultTheme = (): Theme => ThemeFactory.yellowTheme;

  public static getTheme = (color: ColorScheme): Theme => {
    switch (color) {
      case 'yellow':
        return ThemeFactory.yellowTheme;
      case 'turquoise':
        return ThemeFactory.turquoiseTheme;
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
