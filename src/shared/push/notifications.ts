import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification, {ReceivedNotification} from 'react-native-push-notification';

type Channel = {
  channelId: string;
  channelName: string;
};

const channels: Channel[] = [{channelId: 'default', channelName: 'Default'}];

class Notifications {
  public static init() {
    Notifications.configure();
    Notifications.createChannels();
  }

  private static configure = (): void => {
    PushNotification.configure({
      // required
      onNotification: (notification: Omit<ReceivedNotification, 'userInfo'>) => {
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
