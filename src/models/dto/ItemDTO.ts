import {DateParams} from '../DateParams';
import {Reminder} from '../Reminder';

export interface ItemDTO {
  id: string;
  title: string;
  type: string;
  priority: string;
  date: DateParams;
  description: string;
  reminders: Reminder[];
  tags: string[];
  groupId: string;
  deleteReminders?: boolean;
}
