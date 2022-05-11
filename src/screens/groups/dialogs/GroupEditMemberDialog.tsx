import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupMember, GroupPermission, GroupUser} from '../../../models/Group';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import ItemService from '../../../services/ItemService';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import ModalDialog from '../../../components/modals/ModalDialog';
import {PermissionSelect} from '../../../components/inputs/permissionSelect/PermissionSelect';

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
  const {handleResponse} = useSnackContext();
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
      .catch(({response}) => {
        handleResponse(response);
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
    <>
      <UserView user={user} withUsername />
      <PermissionSelect permission={permission} setPermission={setPermission} />
    </>
  );

  const cancelButton = (
    <SolidButton colorScheme="primary" isDisabled={isSubmitting} onPress={close}>
      {t('group:editMember.buttons.cancel')}
    </SolidButton>
  );

  const sendButton = (
    <SolidButton colorScheme="secondary" isDisabled={isSubmitting} isLoading={isSubmitting} onPress={editMember}>
      {t('group:editMember.buttons.send')}
    </SolidButton>
  );

  const actions = (
    <>
      {cancelButton}
      {sendButton}
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:editMember.title')} content={content} actions={actions} />
  );
};

export default GroupEditMemberDialog;
