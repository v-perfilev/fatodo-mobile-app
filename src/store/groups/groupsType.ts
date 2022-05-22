import {Group} from '../../models/Group';
import {Item} from '../../models/Item';

export type GroupsState = {
  groups: Group[];
  loading: boolean;
  items: Map<string, Item[]>;
  itemsCounts: Map<string, number>;
  itemsCollapsed: Map<string, boolean>;
  itemsLoading: Map<string, boolean>;
};
