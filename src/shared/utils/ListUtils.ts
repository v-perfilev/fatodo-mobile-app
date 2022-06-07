import {Theme} from 'native-base';
import {StyleProp, ViewStyle} from 'react-native';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../constants';

export class ListUtils {
  public static invertedStyle: StyleProp<ViewStyle> = {
    scaleY: -1,
  };

  public static containerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    padding: theme.sizes[DEFAULT_SPACE],
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
    flexGrow: 1,
  });

  public static containerInvertedStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    padding: theme.sizes[DEFAULT_SPACE],
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
    flexGrow: 1,
    justifyContent: 'flex-end',
  });

  public static itemStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
  });

  public static itemInvertedStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
    scaleY: -1,
  });
}
