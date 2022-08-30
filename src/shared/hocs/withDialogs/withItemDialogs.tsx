import * as React from 'react';
import {ComponentType, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialogContexts/DialogContext';
import {Item} from '../../../models/Item';
import {ItemDialogContext} from '../../contexts/dialogContexts/ItemDialogContext';
import ItemDeleteDialog, {
  defaultItemDeleteDialogProps,
  ItemDeleteDialogProps,
} from '../../../screens/items/dialogs/ItemDeleteDialog';

enum ItemDialogs {
  DELETE = 'ITEM_DELETE_DIALOG',
}

const withItemDialogs = (Component: ComponentType) => (props: any) => {
  const {handleDialog, setDialogProps, clearDialogProps} = useDialogContext();

  const showItemDeleteDialog = (item: Item, onSuccess?: () => void): void => {
    const show = true;
    const close = (): void => clearDialogProps(ItemDialogs.DELETE);
    const props: ItemDeleteDialogProps = {item, show, close, onSuccess};
    setDialogProps(ItemDialogs.DELETE, props);
  };

  const initDialogs = (): void => {
    handleDialog(ItemDialogs.DELETE, ItemDeleteDialog, defaultItemDeleteDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showItemDeleteDialog,
  };

  return (
    <ItemDialogContext.Provider value={context}>
      <Component {...props} />
    </ItemDialogContext.Provider>
  );
};

export default withItemDialogs;
