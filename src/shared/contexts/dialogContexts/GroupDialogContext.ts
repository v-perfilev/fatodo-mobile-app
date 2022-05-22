import * as React from 'react';
import {useContext} from 'react';
import {Group, GroupUser} from '../../../models/Group';
import {User} from '../../../models/User';

interface GroupDialogState {
  showGroupAddMembersDialog: (group: Group) => void;
  showGroupEditMemberDialog: (group: Group, user: GroupUser) => void;
  showGroupMembersDialog: (group: Group, users: User[]) => void;
  showGroupLeaveDialog: (group: Group, onSuccess?: () => void) => void;
  showGroupDeleteDialog: (group: Group, onSuccess?: () => void) => void;
}

export const GroupDialogContext = React.createContext<GroupDialogState>(null);
export const useGroupDialogContext = (): GroupDialogState => useContext(GroupDialogContext);
