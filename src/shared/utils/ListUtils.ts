import {Theme} from 'native-base';
import {StyleProp, ViewStyle} from 'react-native';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../constants';

export class ListUtils {
  public static draggableStyle: StyleProp<ViewStyle> = {
    height: '100%',
  };

  public static defaultContainerStyle = (): StyleProp<unknown> => ({
    flexGrow: 1,
  });

  public static themedContainerStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    padding: theme.sizes[DEFAULT_SPACE],
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
    flexGrow: 1,
  });

  public static themedItemStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    paddingTop: theme.sizes[HALF_DEFAULT_SPACE],
    paddingBottom: theme.sizes[HALF_DEFAULT_SPACE],
  });
}
