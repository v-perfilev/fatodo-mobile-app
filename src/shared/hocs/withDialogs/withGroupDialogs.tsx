import * as React from 'react';
import {ComponentType, useCallback, useEffect} from 'react';
import {Group} from '../../../models/Group';
import GroupDeleteDialog, {
  defaultGroupDeleteDialogProps,
  GroupDeleteDialogProps,
} from '../../../screens/groups/dialogs/GroupDeleteDialog';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {GroupDialogContext} from '../../contexts/dialogContexts/GroupDialogContext';

enum GroupDialogs {
  DELETE = 'GROUP_DELETE_DIALOG',
}

const withGroupDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

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
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showGroupDeleteDialog,
  };

  return (
    <GroupDialogContext.Provider value={context}>
      <Component {...props} />
    </GroupDialogContext.Provider>
  );
};

export default withGroupDialogs;
