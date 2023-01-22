import React, {ComponentType, memo, useEffect, useState} from 'react';
import {Linking} from 'react-native';
import {flowRight} from 'lodash';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProps} from '../../navigators/RootNavigator';
import {AuthActions} from '../../store/auth/authActions';
import {useAppDispatch, useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

const withUrlListener = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const navigation = useNavigation<RootNavigationProps>();
  const [activationCode, setActivationCode] = useState<string>();
  const [userId, setUserId] = useState<string>();

  const handleActivationUrl = (url: string): void => {
    const regex = new RegExp('activation/(.+)');
    const match = regex.exec(url);
    match && setActivationCode(match[1]);
  };

  const handleUsersUrl = (url: string): void => {
    const regex = new RegExp('users/(.+)');
    const match = regex.exec(url);
    match && setUserId(match[1]);
  };

  const handleUrl = ({url}: {url: string}): void => {
    handleActivationUrl(url);
    handleUsersUrl(url);
  };

  useEffect(() => {
    Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => {
      url && handleUrl({url});
    });
    return () => Linking.removeAllListeners('url');
  }, []);

  useEffect(() => {
    if (isAuthenticated && userId) {
      navigation.navigate('Protected', {screen: 'Default', params: {screen: 'UserView', params: {userId}}});
      setUserId(undefined);
    }
    if (!isAuthenticated && activationCode) {
      dispatch(AuthActions.activateThunk(activationCode));
      setActivationCode(undefined);
    }
  });

  return <Component {...props} />;
};

export default flowRight([memo, withUrlListener]);
