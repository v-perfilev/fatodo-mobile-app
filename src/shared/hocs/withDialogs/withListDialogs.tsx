import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {flowRight} from 'lodash';
import {Group} from '../../../models/Group';
import ListCreateDialog, {
  defaultListCreateDialogProps,
  ListCreateDialogProps,
} from '../../../screens/list/dialogs/ListCreateDialog';
import {ListDialogContext} from '../../contexts/dialogContexts/ListDialogContext';
import ListCreateItemDialog, {
  defaultListCreateItemDialogProps,
  ListCreateItemDialogProps,
} from '../../../screens/list/dialogs/listCreateItemDialog/ListCreateItemDialog';

enum ListDialogs {
  CREATE = 'LIST_CREATE',
  CREATE_ITEM = 'LIST_CREATE_ITEM',
}

const withListDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps, updateDialogProps} = useDialogContext();

  const showCreateDialog = useCallback((groups: Group[]): void => {
    const show = true;
    const close = (): void => {
      clearDialogProps(ListDialogs.CREATE);
    };

    const switchToCreateItem = (): void => {
      updateDialogProps(ListDialogs.CREATE, {show: false});
      showCreateItemDialog(groups);
    };

    const props: ListCreateDialogProps = {groups, show, close, switchToCreateItem};
    setDialogProps(ListDialogs.CREATE, props);
  }, []);

  const showCreateItemDialog = useCallback((groups: Group[]): void => {
    const show = true;
    const close = (): void => clearDialogProps(ListDialogs.CREATE_ITEM);
    const props: ListCreateItemDialogProps = {groups, show, close};
    setDialogProps(ListDialogs.CREATE_ITEM, props);
  }, []);

  useEffect(() => {
    handleDialog(ListDialogs.CREATE, ListCreateDialog, defaultListCreateDialogProps);
    handleDialog(ListDialogs.CREATE_ITEM, ListCreateItemDialog, defaultListCreateItemDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showCreateDialog,
      showCreateItemDialog,
    }),
    [showCreateDialog, showCreateItemDialog],
  );

  return (
    <ListDialogContext.Provider value={context}>
      <Component {...props} />
    </ListDialogContext.Provider>
  );
};

export default flowRight([memo, withListDialogs]);
