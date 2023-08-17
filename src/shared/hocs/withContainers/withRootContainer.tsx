import React, {ComponentType, memo, useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ChatsActions} from '../../../store/chats/chatsActions';
import {EventsActions} from '../../../store/events/eventsActions';
import NotificationsRemote from '../../push/notificationsRemote';
import {AuthActions} from '../../../store/auth/authActions';
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
  const serverState = useAppSelector(AuthSelectors.serverState);
  const account = useAppSelector(AuthSelectors.account);
  const isAuthenticated = useAppSelector(AuthSelectors.isAuthenticated);
  const isActive = useAppSelector(AuthSelectors.isActive);
  const activityTimerId = useRef<NodeJS.Timer>();

  const hideSplashScreen = (): void => {
    setTimeout(() => SplashScreen.hide(), 100);
  };

  const checkHealth = (): void => {
    dispatch(AuthActions.checkHealthThunk());
  };

  const login = (): void => {
    dispatch(AuthActions.loginThunk());
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
    hideSplashScreen();
    checkHealth();
  }, []);

  useEffect(() => {
    serverState === 'HEALTHY' && login();
  }, [serverState]);

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
  }, [isAuthenticated, isActive]);

  useEffect(() => {
    isAuthenticated && NotificationsRemote.subscribeToFirebase(account.id).finally();
  }, [isAuthenticated, account]);

  return <Component {...props} />;
};

export default flowRight([memo, withRootContainer]);
