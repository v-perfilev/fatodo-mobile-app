import * as React from 'react';
import {ComponentType} from 'react';
import {useToken} from 'native-base';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {Linking} from 'react-native';

export type InAppBrowserProps = {
  openBrowser: (url: string) => void;
  closeBrowser: () => void;
};

const withInAppBrowser = (Component: ComponentType<InAppBrowserProps>) => (props: any) => {
  const [primary] = useToken('colors', ['primary.900']);

  const open = (url: string): void => {
    InAppBrowser.isAvailable().then((isAvailable) => {
      if (isAvailable) {
        InAppBrowser.open(url, {
          // iOS Properties
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: primary,
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: false,
          // Android Properties
          showTitle: true,
          toolbarColor: primary,
          secondaryToolbarColor: 'white',
          enableUrlBarHiding: true,
          enableDefaultShare: false,
          forceCloseOnRedirection: true,
        }).finally();
      } else {
        Linking.openURL(url).finally();
      }
    });
  };

  const closeBrowser = (): void => {
    InAppBrowser.close();
  };

  return <Component {...props} openBrowser={open} closeBrowser={closeBrowser} />;
};

export default withInAppBrowser;
