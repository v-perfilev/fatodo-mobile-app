import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';

PushNotification.configure({
  // optional
  onRegister: (token: any): void => {
    console.log('TOKEN:', token);
  },

  // required
  onNotification: function (notification: any) {
    // process the notification
    console.log(notification);

    // required
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // optional
  onAction: (notification: any): void => {
    // process the action
    console.log(notification);
  },

  // optional
  onRegistrationError: (err: any): void => {
    // process the action
    console.log(err);
  },

  // IOS
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  popInitialNotification: true,
  requestPermissions: false,
});

PushNotification.createChannel({channelId: 'test', channelName: 'test'}, () => {});

export const showLocalNotification = (): void => {
  PushNotification.localNotification({channelId: 'test', message: 'test', largeIcon: ''});
};
