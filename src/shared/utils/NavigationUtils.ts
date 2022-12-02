import {ProtectedParamList} from '../../navigators/ProtectedNavigator';
import {navigationRef} from '../hocs/withNavigationContainer';
import {Notification} from '../../models/Notification';

export class NavigationUtils {
  public static navigate = <K extends keyof ProtectedParamList, T extends ProtectedParamList>(
    screen: K,
    params: T[K],
  ): void => {
    if (navigationRef.isReady()) {
      navigationRef.navigate<any>(screen, params);
    } else {
      setTimeout(() => NavigationUtils.navigate(screen, params), 100);
    }
  };

  public static handlePushNotification = (data: Notification): void => {
    if (data.groupId) {
      NavigationUtils.navigate('HomeTabs', {
        screen: 'Groups',
        params: {screen: 'GroupView', params: {groupId: data.groupId}},
      });
    } else if (data.itemId) {
      NavigationUtils.navigate('HomeTabs', {
        screen: 'Groups',
        params: {screen: 'ItemView', params: {itemId: data.itemId}},
      });
    } else if (data.chatId) {
      NavigationUtils.navigate('ChatView', {chatId: data.chatId});
    } else if (data.commentTargetId) {
      NavigationUtils.navigate('CommentList', {targetId: data.commentTargetId});
    } else if (data.userId) {
      NavigationUtils.navigate('UserView', {userId: data.userId});
    }
  };
}
