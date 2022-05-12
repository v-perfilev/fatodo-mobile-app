import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import ItemService from '../../../services/ItemService';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {Item} from '../../../models/Item';

export type ItemDeleteDialogProps = {
  item: Item;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultItemDeleteDialogProps: Readonly<ItemDeleteDialogProps> = {
  item: null,
  show: false,
  close: (): void => undefined,
};

const ItemDeleteDialog = ({item, close, onSuccess}: ItemDeleteDialogProps) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.deleteItem(item?.id)
      .then(() => {
        handleCode('item.deleted', 'info');
        close();
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDisagree = (): void => {
    close();
  };

  return (
    <ConfirmationDialog
      open={!!item}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('item:deleteItem.title')}
      content={t('item:deleteItem.text', {title: item?.title})}
      loading={loading}
    />
  );
};

export default ItemDeleteDialog;
