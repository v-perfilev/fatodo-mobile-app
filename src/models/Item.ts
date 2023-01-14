import {Reminder} from './Reminder';
import {AbstractAuditing} from './AbstractAuditing';

export type ItemPriorityType = 'LOW' | 'NORMAL' | 'HIGH';
export const itemPriorityTypes: ItemPriorityType[] = ['LOW', 'NORMAL', 'HIGH'];

export interface ItemInfo {
  id: string;
  title: string;
}

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  priority: number;
  description?: string;
  reminders?: Reminder[];
  remindersCount: number;
  done: boolean;
  archived: boolean;
  groupId: string;
}
