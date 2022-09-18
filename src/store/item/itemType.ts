import {Item} from '../../models/Item';
import {Reminder} from '../../models/Reminder';
import {Group} from '../../models/Group';

export type ItemState = {
  group: Group;
  item: Item;
  reminders: Reminder[];
};
