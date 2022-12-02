import * as React from 'react';
import {Ref, useContext} from 'react';
import {Event} from '../../models/Event';
import {NotificationBaseMethods} from '../../components/notifications/NotificationBase';

export interface NotificationState {
  event: Event;
  setReady: (ready: boolean) => void;
  close: () => void;
  notificationBaseRef: Ref<NotificationBaseMethods>;
}

export const NotificationContext = React.createContext<NotificationState>({} as NotificationState);
export const useNotificationContext = (): NotificationState => useContext(NotificationContext);
