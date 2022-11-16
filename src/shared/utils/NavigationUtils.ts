import {RootParamList} from '../../navigators/RootNavigator';
import {navigationRef} from '../hocs/withNavigationContainer';
import {PushNotificationData} from '../../models/PushNotification';

export class NavigationUtils {
  public static navigate = <K extends keyof RootParamList, T extends RootParamList>(screen: K, params: T[K]): void => {
    if (navigationRef.isReady()) {
      navigationRef.navigate<any>(screen, params);
    } else {
      setTimeout(() => NavigationUtils.navigate(screen, params), 100);
    }
  };

  public static handlePushNotification = (data: PushNotificationData): void => {
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
