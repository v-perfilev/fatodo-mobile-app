import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';
import GhostButton from '../../../components/controls/GhostButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Group} from '../../../models/Group';
import {GroupActions} from '../../../store/group/groupActions';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import OutlinedButton from '../../../components/controls/OutlinedButton';

export type GroupAddMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
};

export const defaultGroupAddMembersDialogProps: Readonly<GroupAddMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
};

const GroupAddMembersDialog = ({group, show, close}: GroupAddMembersDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    dispatch(GroupActions.addGroupMembersThunk({group, userIds}))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (show) {
      dispatch(ContactsActions.fetchRelationsThunk());
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    setContactIds(relationUserIds);
  }, [show, relations]);

  const isUserIdListEmpty = userIds.length === 0;
  const ignoredIds = group?.members.map((m) => m.userId);

  const content = group && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <GhostButton onPress={close} colorScheme="secondary" isDisabled={isSubmitting}>
        {t('group:addMembers.buttons.cancel')}
      </GhostButton>
      <OutlinedButton
        colorScheme="primary"
        isDisabled={isSubmitting || isUserIdListEmpty}
        isLoading={isSubmitting}
        onPress={addUsers}
      >
        {t('group:addMembers.buttons.send')}
      </OutlinedButton>
    </>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('group:addMembers.title')}
      content={content}
      actions={actions}
      size="xl"
    />
  );
};

export default GroupAddMembersDialog;
