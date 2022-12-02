import React, {ComponentType, memo, useEffect, useMemo, useRef, useState} from 'react';
import {Event} from '../../models/Event';
import {flowRight} from 'lodash';
import NotificationDisplay from '../../components/notifications/NotificationDisplay';
import {NotificationContext} from '../contexts/NotificationContext';
import {NotificationBaseMethods} from '../../components/notifications/NotificationBase';
import {useAppDispatch, useAppSelector} from '../../store/store';
import NotificationSelectors from '../../store/notification/notificationSelectors';
import {NotificationActions} from '../../store/notification/notificationActions';

const NOTIFICATION_CLOSE_TIMEOUT = 5000;
const NOTIFICATION_ERROR_TIMEOUT = 3000;

const withNotificationDisplay = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(NotificationSelectors.events);
  const [event, setEvent] = useState<Event>(undefined);
  const [ready, setReady] = useState<boolean>(false);
  const notificationBaseRef = useRef<NotificationBaseMethods>();
  const readyRef = useRef<boolean>(ready);
  const eventRef = useRef<Event>(event);

  const show = () => {
    notificationBaseRef.current?.show();
    setTimeout(() => {
      eventRef.current && close();
    }, NOTIFICATION_CLOSE_TIMEOUT);
  };

  const close = () => {
    notificationBaseRef.current?.close().finally(() => {
      setEvent(undefined);
      eventRef.current = undefined;
    });
  };

  useEffect(() => {
    if (events.length > 0 && !event) {
      setReady(false);
      setEvent(events[0]);
      eventRef.current = events[0];
      dispatch(NotificationActions.remove());
      setTimeout(() => {
        !readyRef.current && setEvent(undefined);
        !readyRef.current && (eventRef.current = undefined);
      }, NOTIFICATION_ERROR_TIMEOUT);
    }
  }, [events, event]);

  useEffect(() => {
    readyRef.current = ready;
    ready && show();
  }, [ready]);

  const value = useMemo(
    () => ({
      event,
      setReady,
      close,
      notificationBaseRef,
    }),
    [event, notificationBaseRef.current],
  );

  return (
    <NotificationContext.Provider value={value}>
      <Component {...props} />
      <NotificationDisplay />
    </NotificationContext.Provider>
  );
};

export default flowRight([memo, withNotificationDisplay]);
