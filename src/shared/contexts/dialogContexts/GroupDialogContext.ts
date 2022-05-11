import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/Group';

interface GroupDialogState {
  showGroupDeleteDialog: (group: Group, onSuccess: () => void) => void;
  showGroupAddMembersDialog: (group: Group, onSuccess: () => void) => void;
  // showGroupEditMemberDialog: (group: Group, user: GroupUser, onSuccess: () => void) => void;
  // showGroupMembersDialog: (group: Group, users: User[], onSuccess: () => void) => void;
  showGroupLeaveDialog: (group: Group, onSuccess: () => void) => void;
}

export const GroupDialogContext = React.createContext<GroupDialogState>(null);
export const useGroupDialogContext = (): GroupDialogState => useContext(GroupDialogContext);
