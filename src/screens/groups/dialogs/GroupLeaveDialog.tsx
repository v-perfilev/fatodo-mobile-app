import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/Group';
import ItemService from '../../../services/ItemService';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useAppDispatch} from '../../../store/hooks';
import SnackActions from '../../../store/snack/snackActions';

export type GroupLeaveDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupLeaveDialogProps: Readonly<GroupLeaveDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

const GroupLeaveDialog = ({group, show, close, onSuccess}: GroupLeaveDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);

  const onAgree = (): void => {
    setLoading(true);
    ItemService.leaveGroup(group?.id)
      .then(() => {
        dispatch(SnackActions.handleCode('group.left', 'info'));
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
      title={t('group:leaveGroup.title')}
      content={t('group:leaveGroup.text', {title: group?.title})}
      loading={loading}
    />
  );
};

export default GroupLeaveDialog;
