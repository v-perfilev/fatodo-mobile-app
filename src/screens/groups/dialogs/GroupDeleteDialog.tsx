import React, {useState} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import ItemService from '../../../services/ItemService';
import {Group} from '../../../models/Group';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';

export type GroupDeleteDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupDeleteDialogProps: Readonly<GroupDeleteDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

const GroupDeleteDialog = ({group, show, close, onSuccess}: GroupDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.deleteGroup(group?.id)
      .then(() => {
        dispatch(SnackActions.handleCode('group.deleted', 'info'));
        close();
        onSuccess();
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
      open={show}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('group:deleteGroup.title')}
      content={t('group:deleteGroup.text', {title: group?.title})}
      loading={loading}
    />
  );
};

export default GroupDeleteDialog;
