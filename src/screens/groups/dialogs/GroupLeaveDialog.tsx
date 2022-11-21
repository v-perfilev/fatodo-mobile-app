import React, {memo} from 'react';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/Group';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useAppDispatch} from '../../../store/store';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupsActions} from '../../../store/groups/groupsActions';

export type GroupLeaveDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
};

export const defaultGroupLeaveDialogProps: Readonly<GroupLeaveDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
  onSuccess: (): void => null,
};

const GroupLeaveDialog = ({group, show, close, onSuccess = () => null}: GroupLeaveDialogProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useDelayedState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(GroupsActions.leaveGroupThunk(group.id))
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
      open={show}
      onAgree={onAgree}
      onDisagree={onDisagree}
      title={t('group:leaveGroup.title')}
      content={t('group:leaveGroup.text', {title: group?.title})}
      loading={loading}
    />
  );
};

export default memo(GroupLeaveDialog);
