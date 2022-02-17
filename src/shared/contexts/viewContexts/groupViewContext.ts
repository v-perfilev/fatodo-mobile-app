import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/Group';

type GroupViewState = {
  group: Group;
  setGroup: (group: Group) => void;
  load: (groupId: string, notFoundAction?: () => void, failedAction?: () => void) => void;
  loading: boolean;
};

export const GroupViewContext = React.createContext<GroupViewState>(null);
export const useGroupViewContext = (): GroupViewState => useContext(GroupViewContext);
