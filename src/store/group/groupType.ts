import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export type GroupState = {
  group: Group;
  activeItems: Item[];
  archivedItems: Item[];
  allActiveItemsLoaded: boolean;
  allArchivedItemsLoaded: boolean;
};
