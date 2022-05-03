import * as React from 'react';
import {ComponentType, useState} from 'react';
import {useSnackContext} from '../../contexts/SnackContext';
import {Reminder} from '../../../models/Reminder';
import NotificationService from '../../../services/NotificationService';
import {ReminderListContext} from '../../contexts/listContexts/reminderListContext';

const withReminderList = (Component: ComponentType) => (props: any) => {
  const {handleResponse} = useSnackContext();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const load = (itemId: string): void => {
    setLoading(true);
    NotificationService.getAllByTargetId(itemId)
      .then((response) => {
        setReminders(response.data);
      })
      .catch(({response}) => {
        if (response.status !== 404) {
          handleResponse(response);
        }
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
