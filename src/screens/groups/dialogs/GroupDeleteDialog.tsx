import React, {memo} from 'react';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/Group';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupsActions} from '../../../store/groups/groupsActions';

export type GroupDeleteDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultGroupDeleteDialogProps: Readonly<GroupDeleteDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const GroupDeleteDialog = ({group, show, close, onSuccess = () => null}: GroupDeleteDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(GroupsActions.removeGroupThunk(group.id))
      .unwrap()
      .then(() => {
        onSuccess();
        close();
      })
      .finally(() => setLoading(false));
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

export default memo(GroupDeleteDialog);
