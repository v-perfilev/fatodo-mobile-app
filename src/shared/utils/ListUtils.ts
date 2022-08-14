import {Theme} from 'native-base';
import {StyleProp, ViewStyle} from 'react-native';
import {DEFAULT_SPACE, HALF_DEFAULT_SPACE} from '../../constants';

export class ListUtils {
  public static draggableStyle: StyleProp<ViewStyle> = {
    height: '100%',
  };

  public static containerStyle = (paddingTop?: number): StyleProp<unknown> => ({
    paddingTop,
    flexGrow: 1,
  });

  public static themedItemStyle = (theme: Theme): StyleProp<ViewStyle> => ({
    margin: theme.sizes[DEFAULT_SPACE],
    marginTop: theme.sizes[HALF_DEFAULT_SPACE],
    marginBottom: theme.sizes[HALF_DEFAULT_SPACE],
  });
}
