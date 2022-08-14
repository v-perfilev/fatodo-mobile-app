import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export type GroupState = {
  group: Group;
  activeItemsCount: number;
  archivedItemsCount: number;
  activeItems: Item[];
  archivedItems: Item[];
  loading: boolean;
  activeItemsLoading: boolean;
  archivedItemsLoading: boolean;
  allActiveItemsLoaded: boolean;
  allArchivedItemsLoaded: boolean;
};
