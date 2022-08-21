import {firebase} from '@react-native-firebase/messaging';

class NotificationsRemote {
  public static init() {
    NotificationsRemote.configureRemote();
  }

  public static subscribeToFirebase = (topic: string): void => {
    firebase.messaging().subscribeToTopic(topic).finally();
  };

  public static unregisterDeviceFromFirebase = (): void => {
    firebase.messaging().unregisterDeviceForRemoteMessages().finally();
  };

  private static configureRemote = (): void => {
    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.info('Message handled in the background', remoteMessage);
    });
  };
}

export default NotificationsRemote;
