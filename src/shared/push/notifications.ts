import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {ReceivedNotification} from 'react-native-push-notification';
import {NavigationUtils} from '../utils/NavigationUtils';
import {Notification} from '../../models/Notification';

type Channel = {
  channelId: string;
  channelName: string;
};

const channels: Channel[] = [
  {channelId: 'default', channelName: 'Default'},
  {channelId: 'firebase_channel', channelName: 'Firebase'},
];

class Notifications {
  public static init() {
    Notifications.configure();
    Notifications.createChannels();
  }

  private static configure = (): void => {
    PushNotification.configure({
      // required
      onNotification: (notification: Omit<ReceivedNotification, 'userInfo'>) => {
        if (notification.userInteraction) {
          console.info('App opened by click on notification', notification);
          const data: Notification = notification.data;
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
