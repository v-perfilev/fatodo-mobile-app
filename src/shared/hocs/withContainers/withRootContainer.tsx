import React, {ComponentType, memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import NotificationsRemote from '../../push/notificationsRemote';
import {AuthActions} from '../../../store/auth/authActions';
import {SecurityUtils} from '../../utils/SecurityUtils';
import {AppState, NativeEventSubscription, Platform} from 'react-native';
import {RootActions} from '../../../store/rootActions';
import SplashScreen from 'react-native-splash-screen';
import {flowRight} from 'lodash';
import {ActivityDTO} from '../../../models/dto/ActivityDTO';
import {ACTIVITY_TIMEOUT} from '../../../constants';
import {getUniqueId} from 'react-native-device-info';

export type WithRootProps = {
  ready: boolean;
};

const withRootContainer = (Component: ComponentType<WithRootProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const isActive = useAppSelector(AuthSelectors.isActive);
  const [ready, setReady] = useState(false);
  const activityTimerId = useRef<NodeJS.Timer>();

  const login = (): void => {
    const tryToLogin = async (): Promise<void> => {
      const token = await SecurityUtils.getAuthToken();
      token && (await dispatch(AuthActions.fetchAccountThunk()));
      token && (await dispatch(AuthActions.setIsAuthenticated()));
    };
    tryToLogin().finally(() => setReady(true));
  };

  const getAppStatusSubscription = (): NativeEventSubscription => {
    return AppState.addEventListener('change', (state) => {
      const isActive = state === 'active';
      const isInactive = state === 'inactive' || state === 'background';
      isActive && dispatch(AuthActions.setIsActive(true));
      isInactive && dispatch(AuthActions.setIsActive(false));
    });
  };

  const refresh = (): void => {
    dispatch(RootActions.afterRefreshState());
    setTimeout(() => {
      dispatch(ContactsActions.fetchRelationsThunk());
      dispatch(ContactsActions.fetchOutcomingRequestsThunk());
      dispatch(ContactsActions.fetchIncomingRequestsThunk());
      dispatch(ChatsActions.fetchUnreadMessagesMapThunk());
      dispatch(EventsActions.fetchUnreadCountThunk());
    }, 1000);
  };

  const writeActivity = (): void => {
    getUniqueId().then((deviceId) => {
      if (deviceId) {
        const deviceType = Platform.OS === 'android' ? 'ANDROID' : 'IOS';
        const dto: ActivityDTO = {deviceType, deviceId};
        dispatch(AuthActions.writeActivityThunk(dto));
      }
    });
  };

  useEffect(() => {
    login();
  }, []);

  useEffect(() => {
    const appStateSubscription = getAppStatusSubscription();
    return () => appStateSubscription.remove();
  }, []);

  useEffect(() => {
    if (isActive && isAuthenticated) {
      refresh();
      writeActivity();
      activityTimerId.current = setInterval(writeActivity, ACTIVITY_TIMEOUT);
    } else {
      clearInterval(activityTimerId.current);
    }
  }, [isActive, isAuthenticated]);

  useEffect(() => {
    account && NotificationsRemote.subscribeToFirebase(account.id).finally();
  }, [account]);

  useLayoutEffect(() => {
    ready && setTimeout(() => SplashScreen.hide(), 500);
  }, [ready]);

  return <Component ready={ready} {...props} />;
};

export default flowRight([memo, withRootContainer]);
