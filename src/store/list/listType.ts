import {Item} from '../../models/Item';
import {Group} from '../../models/Group';

export type ListState = {
  groups: Group[];
  items: Item[];
  allItemsLoaded: boolean;
  listInitialized: boolean;
  shouldLoad: boolean;
};
