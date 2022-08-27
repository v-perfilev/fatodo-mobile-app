import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {ReceivedNotification} from 'react-native-push-notification';
import {PushNotificationData} from '../../models/PushNotification';
import {NavigationUtils} from '../utils/NavigationUtils';

type Channel = {
  channelId: string;
  channelName: string;
};

const channels: Channel[] = [{channelId: 'test', channelName: 'test'}];

class Notifications {
  public static init() {
    Notifications.configure();
    Notifications.createChannels();
  }

  public static showLocal = (channelId: string, title: string, message: string, data?: PushNotificationData): void => {
    PushNotification.localNotification({channelId, title, message, userInfo: data, largeIcon: ''});
  };

  private static configure = (): void => {
    PushNotification.configure({
      // required
      onNotification: (notification: Omit<ReceivedNotification, 'userInfo'>) => {
        console.info('Local message received');
        if (notification.userInteraction) {
          const data: PushNotificationData = notification.data;
          data && NavigationUtils.handlePushNotification(data);
        }
        // required
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      popInitialNotification: true,
      requestPermissions: true,
    });
  };

  private static createChannels = (): void => {
    channels.forEach(({channelId, channelName}) => {
      PushNotification.createChannel({channelId, channelName}, () => {});
    });
  };
}

export default Notifications;