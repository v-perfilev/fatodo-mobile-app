import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import ItemService from '../../../services/ItemService';
import SolidButton from '../../../components/controls/SolidButton';
import ModalDialog from '../../../components/modals/ModalDialog';
import {Group} from '../../../models/Group';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';

export type GroupAddMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupAddMembersDialogProps: Readonly<GroupAddMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

const GroupAddMembersDialog = ({group, show, close, onSuccess}: GroupAddMembersDialogProps) => {
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const {relations, update} = useContactContext();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    ItemService.addMembersToGroup(group.id, userIds)
      .then(() => {
        close();
        onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (show && update) {
      update();
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    setContactIds(relationUserIds);
  }, [show, relations]);

  const isUserIdListEmpty = userIds.length === 0;
  const ignoredIds = group?.members.map((m) => m.id);

  const content = group && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <SolidButton onPress={close} colorScheme="primary" isDisabled={isSubmitting}>
        {t('group:addMembers.buttons.cancel')}
      </SolidButton>
      <SolidButton
        colorScheme="secondary"
        isDisabled={isSubmitting || isUserIdListEmpty}
        isLoading={isSubmitting}
        onPress={addUsers}
      >
        {t('group:addMembers.buttons.send')}
      </SolidButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:addMembers.title')} content={content} actions={actions} />
  );
};

export default GroupAddMembersDialog;
