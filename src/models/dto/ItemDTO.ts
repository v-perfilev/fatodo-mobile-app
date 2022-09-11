import {DateParams} from '../DateParams';
import {Reminder} from '../Reminder';

export interface ItemDTO {
  id: string;
  title: string;
  status: string;
  type: string;
  priority: string;
  date: DateParams;
  description: string;
  reminders: Reminder[];
  groupId: string;
  deleteReminders?: boolean;
}
