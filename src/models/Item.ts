import {Reminder} from './Reminder';
import {AbstractAuditing} from './AbstractAuditing';
import {DateParams} from './DateParams';

export type ItemType = 'TASK' | 'EVENT' | 'REPETITION' | 'NOTE';
export type ItemPriorityType = 'LOW' | 'NORMAL' | 'HIGH';
export type ItemStatusType = 'CREATED' | 'WORK_IN_PROGRESS' | 'COMPLETED' | 'CLOSED';

export const itemTypes: ItemType[] = ['TASK', 'EVENT', 'REPETITION', 'NOTE'];
export const itemPriorityTypes: ItemPriorityType[] = ['LOW', 'NORMAL', 'HIGH'];
export const itemStatusTypes: ItemStatusType[] = ['CREATED', 'WORK_IN_PROGRESS', 'COMPLETED', 'CLOSED'];

export interface ItemInfo {
  id: string;
  title: string;
}

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  status: ItemStatusType;
  type: ItemType;
  priority: ItemPriorityType;
  date?: DateParams;
  description?: string;
  reminders?: Reminder[];
  remindersCount: number;
  archived: boolean;
  groupId: string;
}
