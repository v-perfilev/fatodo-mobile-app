import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupMember, GroupPermission, GroupUser} from '../../../models/Group';
import UserView from '../../../components/views/UserView';
import ModalDialog from '../../../components/modals/ModalDialog';
import GhostButton from '../../../components/controls/GhostButton';
import FVStack from '../../../components/boxes/FVStack';
import PermissionSelect from '../../../components/inputs/permissionSelect/PermissionSelect';
import {useAppDispatch} from '../../../store/store';
import {GroupActions} from '../../../store/group/groupActions';
import OutlinedButton from '../../../components/controls/OutlinedButton';

export type GroupEditMemberDialogProps = {
  group: Group;
  user: GroupUser;
  show: boolean;
  close: () => void;
};

export const defaultGroupEditMemberDialogProps: Readonly<GroupEditMemberDialogProps> = {
  group: null,
  user: null,
  show: false,
  close: (): void => null,
};

type Props = GroupEditMemberDialogProps;

const GroupEditMemberDialog: FC<Props> = ({group, user, show, close}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permission, setPermission] = useState<GroupPermission>();

  const editMember = (): void => {
    setIsSubmitting(true);
    const editedMember: GroupMember = {userId: user.userId, permission};
    dispatch(GroupActions.editGroupMemberThunk({group, member: editedMember}))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (group && user) {
      setPermission(user.permission);
    }
  }, [group, user]);

  const content = group && user && (
    <FVStack defaultSpace>
      <UserView user={user} withUsername />
      <PermissionSelect permission={permission} setPermission={setPermission} />
    </FVStack>
  );

  const actions = (
    <>
      <GhostButton colorScheme="secondary" isDisabled={isSubmitting} onPress={close}>
        {t('group:editMember.buttons.cancel')}
      </GhostButton>
      <OutlinedButton colorScheme="primary" isDisabled={isSubmitting} isLoading={isSubmitting} onPress={editMember}>
        {t('group:editMember.buttons.send')}
      </OutlinedButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:editMember.title')} content={content} actions={actions} />
  );
};

export default GroupEditMemberDialog;
