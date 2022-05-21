import {Item} from '../../models/Item';
import {Reminder} from '../../models/Reminder';

export type ItemState = {
  item: Item;
  reminders: Reminder[];
  loading: boolean;
};
