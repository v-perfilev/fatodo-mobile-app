import * as React from 'react';
import {ComponentType, useCallback, useEffect} from 'react';
import {Group} from '../../../models/Group';
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

enum GroupDialogs {
  ADD_MEMBERS = 'GROUP_ADD_MEMBERS_DIALOG',
  DELETE = 'GROUP_DELETE_DIALOG',
  LEAVE = 'GROUP_LEAVE_DIALOG',
}

const withGroupDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps, updateDialogProps} = useDialogContext();

  const showGroupAddMembersDialog = useCallback(
    (group: Group, onSuccess: () => void): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.ADD_MEMBERS, {show: false});
      const props = {group, show, close, onSuccess} as GroupAddMembersDialogProps;
      setDialogProps(GroupDialogs.ADD_MEMBERS, props);
    },
    [setDialogProps, updateDialogProps],
  );

  const showGroupLeaveDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.LEAVE);
      const props = {group, show, close, onSuccess} as GroupLeaveDialogProps;
      setDialogProps(GroupDialogs.LEAVE, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const showGroupDeleteDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.DELETE);
      const props = {group, show, close, onSuccess} as GroupDeleteDialogProps;
      setDialogProps(GroupDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps],
  );

  const initDialogs = (): void => {
    handleDialog(GroupDialogs.ADD_MEMBERS, GroupAddMembersDialog, defaultGroupAddMembersDialogProps);
    handleDialog(GroupDialogs.LEAVE, GroupLeaveDialog, defaultGroupLeaveDialogProps);
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showGroupAddMembersDialog,
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
