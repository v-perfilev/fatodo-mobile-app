import * as React from 'react';
import {ComponentType, memo, useCallback, useEffect, useMemo} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {Item} from '../../../models/Item';
import {ItemDialogContext} from '../../contexts/dialogContexts/ItemDialogContext';
import ItemDeleteDialog, {
  defaultItemDeleteDialogProps,
  ItemDeleteDialogProps,
} from '../../../screens/items/dialogs/ItemDeleteDialog';
import {flowRight} from 'lodash';

enum ItemDialogs {
  DELETE = 'ITEM_DELETE_DIALOG',
}

const withItemDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showItemDeleteDialog = useCallback((item: Item, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ItemDialogs.DELETE);
    const props: ItemDeleteDialogProps = {item, show, close, onSuccess};
    setDialogProps(ItemDialogs.DELETE, props);
  }, []);

  useEffect(() => {
    handleDialog(ItemDialogs.DELETE, ItemDeleteDialog, defaultItemDeleteDialogProps);
  }, []);

  const context = useMemo(
    () => ({
      showItemDeleteDialog,
    }),
    [showItemDeleteDialog],
  );

  return (
    <ItemDialogContext.Provider value={context}>
      <Component {...props} />
    </ItemDialogContext.Provider>
  );
};

export default flowRight([memo, withItemDialogs]);
