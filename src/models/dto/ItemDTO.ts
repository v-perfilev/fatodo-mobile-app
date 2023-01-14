import {Reminder} from '../Reminder';

export interface ItemDTO {
  id: string;
  title: string;
  priority: number;
  description: string;
  reminders: Reminder[];
  groupId: string;
  done: boolean;
  deleteReminders?: boolean;
}
