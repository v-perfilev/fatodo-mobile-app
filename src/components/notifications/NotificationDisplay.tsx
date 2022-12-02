import React from 'react';
import NotificationBase from './NotificationBase';
import NotificationItem from './NotificationItem';
import {useNotificationContext} from '../../shared/contexts/NotificationContext';

const NotificationDisplay = () => {
  const {event, notificationBaseRef} = useNotificationContext();

  return (
    <NotificationBase notificationBaseRef={notificationBaseRef}>
      <NotificationItem event={event} />
    </NotificationBase>
  );
};

export default NotificationDisplay;
