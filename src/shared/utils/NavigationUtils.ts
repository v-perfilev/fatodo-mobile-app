import {navigationRef} from '../hocs/withNavigationContainer';
import {Notification} from '../../models/Notification';
import {RootParamList} from '../../navigators/RootNavigator';

export class NavigationUtils {
  public static navigate = <K extends keyof RootParamList, T extends RootParamList>(screen: K, params: T[K]): void => {
    if (navigationRef.isReady()) {
      navigationRef.navigate<any>(screen, params);
    } else {
      setTimeout(() => NavigationUtils.navigate(screen, params), 100);
    }
  };

  public static handlePushNotification = (data: Notification): void => {
    if (data.groupId) {
      NavigationUtils.navigate('Protected', {
        screen: 'Default',
        params: {
          screen: 'HomeTabs',
          params: {
            screen: 'Groups',
            params: {screen: 'GroupView', params: {groupId: data.groupId}},
          },
        },
      });
    } else if (data.itemId) {
      NavigationUtils.navigate('Protected', {
        screen: 'Default',
        params: {
          screen: 'HomeTabs',
          params: {
            screen: 'Groups',
            params: {screen: 'ItemView', params: {itemId: data.itemId}},
          },
        },
      });
    } else if (data.chatId) {
      NavigationUtils.navigate('Protected', {
        screen: 'Default',
        params: {screen: 'ChatView', params: {chatId: data.chatId}},
      });
    } else if (data.targetId) {
      NavigationUtils.navigate('Protected', {
        screen: 'Default',
        params: {screen: 'CommentList', params: {targetId: data.targetId}},
      });
    } else if (data.userId) {
      NavigationUtils.navigate('Protected', {
        screen: 'Default',
        params: {screen: 'UserView', params: {userId: data.userId}},
      });
    }
  };
}
