import {firebase, FirebaseMessagingTypes} from '@react-native-firebase/messaging';

class NotificationsRemote {
  public static init() {
    NotificationsRemote.requestPermissions().finally(() => NotificationsRemote.configureRemote());
  }

  private static requestPermissions = async (): Promise<void> => {
    await firebase
      .messaging()
      .requestPermission({provisional: true})
      .then((status: FirebaseMessagingTypes.AuthorizationStatus) => {
        const enabled =
          status === firebase.messaging.AuthorizationStatus.AUTHORIZED ||
          status === firebase.messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          console.log('Authorization status is', status);
        }
      });
  };

  private static configureRemote = async () => {
    firebase.messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.info('Message handled in the background', remoteMessage);
    });
  };

  public static subscribeToFirebase = async (topic: string): Promise<void> => {
    firebase
      .messaging()
      .subscribeToTopic(topic)
      .then(() => console.info('Registered on firebase with topic: ' + topic))
      .catch((e) => console.warn('Error while connecting to firebase: ', e));
  };

  public static unsubscribeFromFirebase = async (topic: string): Promise<void> => {
    firebase
      .messaging()
      .unsubscribeFromTopic(topic)
      .then(() => console.info('Unsubscribed from firebase with topic: ' + topic))
      .catch((e) => console.warn('Error while unsubscribing from firebase: ', e));
  };
}

export default NotificationsRemote;
