import * as React from 'react';
import {ComponentType, useCallback, useEffect} from 'react';
import {Group, GroupUser} from '../../../models/Group';
import GroupDeleteDialog, {
  defaultGroupDeleteDialogProps,
  GroupDeleteDialogProps,
} from '../../../screens/groups/dialogs/GroupDeleteDialog';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {GroupDialogContext} from '../../contexts/dialogContexts/GroupDialogContext';
import GroupLeaveDialog, {
  defaultGroupLeaveDialogProps,
  GroupLeaveDialogProps,
} from '../../../screens/groups/dialogs/GroupLeaveDialog';
import GroupAddMembersDialog, {
  defaultGroupAddMembersDialogProps,
  GroupAddMembersDialogProps,
} from '../../../screens/groups/dialogs/GroupAddMembersDialog';
import GroupMembersDialog, {
  defaultGroupMembersDialogProps,
  GroupMembersDialogProps,
} from '../../../screens/groups/dialogs/groupMembersDialog/GroupMembersDialog';
import GroupEditMemberDialog, {
  defaultGroupEditMemberDialogProps,
  GroupEditMemberDialogProps,
} from '../../../screens/groups/dialogs/GroupEditMemberDialog';

enum GroupDialogs {
  ADD_MEMBERS = 'GROUP_ADD_MEMBERS_DIALOG',
  EDIT_MEMBER = 'GROUP_EDIT_MEMBER_DIALOG',
  MEMBERS = 'GROUP_MEMBERS_DIALOG',
  LEAVE = 'GROUP_LEAVE_DIALOG',
  DELETE = 'GROUP_DELETE_DIALOG',
}

const withGroupDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps, updateDialogProps} = useDialogContext();

  const showGroupAddMembersDialog = useCallback(
    (group: Group): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.ADD_MEMBERS, {show: false});
      const props: GroupAddMembersDialogProps = {group, show, close};
      setDialogProps(GroupDialogs.ADD_MEMBERS, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showGroupEditMemberDialog = useCallback(
    (group: Group, user: GroupUser): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.EDIT_MEMBER, {show: false});
      const props: GroupEditMemberDialogProps = {group, user, show, close};
      setDialogProps(GroupDialogs.EDIT_MEMBER, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showGroupMembersDialog = useCallback(
    (group: Group): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.MEMBERS, {show: false});

      const switchToAddMembers = (): void => {
        updateDialogProps(GroupDialogs.MEMBERS, {show: false});
        showGroupAddMembersDialog(group);
      };
      const switchToEditMember = (user: GroupUser): void => {
        updateDialogProps(GroupDialogs.MEMBERS, {show: false});
        showGroupEditMemberDialog(group, user);
      };
      const props: GroupMembersDialogProps = {
        group,
        show,
        close,
        switchToAddMembers,
        switchToEditMember,
      };

      setDialogProps(GroupDialogs.MEMBERS, props);
    },
    [setDialogProps, updateDialogProps, showGroupAddMembersDialog, showGroupEditMemberDialog],
  );

  const showGroupLeaveDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.LEAVE);
      const props: GroupLeaveDialogProps = {group, show, close, onSuccess};
      setDialogProps(GroupDialogs.LEAVE, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const showGroupDeleteDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.DELETE);
      const props: GroupDeleteDialogProps = {group, show, close, onSuccess};
      setDialogProps(GroupDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const initDialogs = (): void => {
    handleDialog(GroupDialogs.ADD_MEMBERS, GroupAddMembersDialog, defaultGroupAddMembersDialogProps);
    handleDialog(GroupDialogs.EDIT_MEMBER, GroupEditMemberDialog, defaultGroupEditMemberDialogProps);
    handleDialog(GroupDialogs.MEMBERS, GroupMembersDialog, defaultGroupMembersDialogProps);
    handleDialog(GroupDialogs.LEAVE, GroupLeaveDialog, defaultGroupLeaveDialogProps);
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showGroupAddMembersDialog,
    showGroupEditMemberDialog,
    showGroupMembersDialog,
    showGroupLeaveDialog,
    showGroupDeleteDialog,
  };

  return (
    <GroupDialogContext.Provider value={context}>
      <Component {...props} />
    </GroupDialogContext.Provider>
  );
};

export default withGroupDialogs;
