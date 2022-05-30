import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export type GroupsState = {
  groups: Group[];
  cachedGroups: Group[];
  loading: boolean;
  items: [string, Item[]][];
  itemsCount: [string, number][];
  itemsCollapsed: [string, boolean][];
  itemsLoading: [string, boolean][];
};
