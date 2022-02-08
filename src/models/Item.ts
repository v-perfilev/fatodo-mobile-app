import {Reminder} from './Reminder';
import {AbstractAuditing} from './AbstractAuditing';
import {DateParams} from './DateParams';

export type ItemType = 'TASK' | 'EVENT' | 'REPETITION' | 'NOTE';
export type ItemPriorityType = 'LOW' | 'NORMAL' | 'HIGH';
export type ItemStatusType = 'CREATED' | 'WORK_IN_PROGRESS' | 'COMPLETED' | 'CLOSED';

export const itemTypes: ItemType[] = ['TASK', 'EVENT', 'REPETITION', 'NOTE'];
export const itemPriorityTypes: ItemPriorityType[] = ['LOW', 'NORMAL', 'HIGH'];
export const itemStatusTypes: ItemStatusType[] = ['CREATED', 'WORK_IN_PROGRESS', 'COMPLETED', 'CLOSED'];

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  type: ItemType;
  priority: ItemPriorityType;
  date?: DateParams;
  description?: string;
  reminders?: Reminder[];
  tags?: string[];
  status: ItemStatusType;
  archived: boolean;
  groupId: string;
}
