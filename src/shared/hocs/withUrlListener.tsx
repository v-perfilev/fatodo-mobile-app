import React, {ComponentType, memo, useEffect} from 'react';
import {Linking} from 'react-native';
import {flowRight} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigators/RootNavigator';

const withUrlListener = (Component: ComponentType) => (props: any) => {
  const navigation = useNavigation<RootNavigationProps>();

  const handleActivationUrl = (url: string): void => {
    const regex = new RegExp('activation/(.+)');
    const match = regex.exec(url);
    if (match) {
      const activationCode = match[1];
      navigation.navigate('Public', {screen: 'SignIn', params: {activationCode}});
    }
  };

  const handleUrl = ({url}: {url: string}): void => {
    handleActivationUrl(url);
  };

  useEffect(() => {
    Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      url && handleUrl({url});
    });
    return () => Linking.removeAllListeners('url');
  }, []);

  return <Component {...props} />;
};

export default flowRight([memo, withUrlListener]);
