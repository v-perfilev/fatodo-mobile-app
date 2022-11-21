import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {Item} from '../../../models/Item';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupActions} from '../../../store/group/groupActions';

export type ItemDeleteDialogProps = {
  item: Item;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultItemDeleteDialogProps: Readonly<ItemDeleteDialogProps> = {
  item: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const ItemDeleteDialog = ({item, close, onSuccess = () => null}: ItemDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(GroupActions.removeItemThunk(item))
      .unwrap()
      .then(() => {
        onSuccess?.();
        close();
      })
      .finally(() => setLoading(false));
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

export default memo(ItemDeleteDialog);
