import * as React from 'react';
import {ComponentType, useState} from 'react';
import {Reminder} from '../../../models/Reminder';
import NotificationService from '../../../services/NotificationService';
import {ReminderListContext} from '../../contexts/listContexts/reminderListContext';

const withReminderList = (Component: ComponentType) => (props: any) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const load = (itemId: string): void => {
    setLoading(true);
    NotificationService.getAllByTargetId(itemId)
      .then((response) => {
        setReminders(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {reminders, setReminders, load, loading};

  return (
    <ReminderListContext.Provider value={context}>
      <Component {...props} />
    </ReminderListContext.Provider>
  );
};

export default withReminderList;
