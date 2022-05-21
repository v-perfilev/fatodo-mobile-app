import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupMember, GroupPermission, GroupUser} from '../../../models/Group';
import ItemService from '../../../services/ItemService';
import UserView from '../../../components/views/UserView';
import ModalDialog from '../../../components/modals/ModalDialog';
import GhostButton from '../../../components/controls/GhostButton';
import FVStack from '../../../components/surfaces/FVStack';
import PermissionSelect from '../../../components/inputs/permissionSelect/PermissionSelect';

export type GroupEditMemberDialogProps = {
  group: Group;
  user: GroupUser;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupEditMemberDialogProps: Readonly<GroupEditMemberDialogProps> = {
  group: null,
  user: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

type Props = GroupEditMemberDialogProps;

const GroupEditMemberDialog: FC<Props> = ({group, user, show, close, onSuccess}: Props) => {
  const {t} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permission, setPermission] = useState<GroupPermission>();

  const editMember = (): void => {
    setIsSubmitting(true);
    const editedMember = {id: user.id, permission} as GroupMember;
    ItemService.editGroupMember(group.id, editedMember)
      .then(() => {
        close();
        onSuccess();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
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
      <GhostButton colorScheme="primary" isDisabled={isSubmitting} isLoading={isSubmitting} onPress={editMember}>
        {t('group:editMember.buttons.send')}
      </GhostButton>
      <GhostButton colorScheme="secondary" isDisabled={isSubmitting} onPress={close}>
        {t('group:editMember.buttons.cancel')}
      </GhostButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:editMember.title')} content={content} actions={actions} />
  );
};

export default GroupEditMemberDialog;
