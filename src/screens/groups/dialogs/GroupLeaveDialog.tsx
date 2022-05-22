import React from 'react';
import {useTranslation} from 'react-i18next';
import {Group} from '../../../models/Group';
import ConfirmationDialog from '../../../components/modals/ConfirmationDialog';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import GroupsThunks from '../../../store/groups/groupsThunks';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

export type GroupLeaveDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess?: () => void;
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
  const [loading, setLoading] = useLoadingState(false);

  const onAgree = (): void => {
    setLoading(true);
    dispatch(GroupsThunks.leaveGroup(group.id))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('group.left', 'info'));
        close();
        if (onSuccess) {
          onSuccess();
        }
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
