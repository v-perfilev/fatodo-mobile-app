import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export type GroupsState = {
  groups: Group[];
  cachedGroups: Group[];
  items: [string, Item[]][];
  itemsCount: [string, number][];
  itemsLoading: [string, boolean][];
  itemsCollapsed: [string, boolean][];
  groupsInitialized: boolean;
};
