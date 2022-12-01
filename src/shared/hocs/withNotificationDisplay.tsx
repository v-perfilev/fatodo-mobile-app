import * as React from 'react';
import {ComponentType, memo} from 'react';
import {flowRight} from 'lodash';
import NotificationDisplay from '../../components/notifications/NotificationDisplay';

const withNotificationDisplay = (Component: ComponentType) => (props: any) => {
  return (
    <>
      <Component {...props} />
      <NotificationDisplay />
    </>
  );
};

export default flowRight([memo, withNotificationDisplay]);
