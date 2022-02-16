import * as React from 'react';
import {useContext} from 'react';
import {Reminder} from '../../../models/Reminder';

type ReminderListState = {
  reminders: Reminder[];
  setReminders: (reminders: Reminder[]) => void;
  load: (itemId: string) => void;
  loading: boolean;
};

export const ReminderListContext = React.createContext<ReminderListState>(null);
export const useReminderListContext = (): ReminderListState => useContext(ReminderListContext);
