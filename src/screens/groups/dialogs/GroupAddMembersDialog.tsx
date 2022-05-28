import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';
import GhostButton from '../../../components/controls/GhostButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import {Chat} from '../../../models/Chat';
import ChatThunks from '../../../store/chat/chatThunks';

export type GroupAddMembersDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
};

export const defaultGroupAddMembersDialogProps: Readonly<GroupAddMembersDialogProps> = {
  chat: null,
  show: false,
  close: (): void => undefined,
};

const GroupAddMembersDialog = ({chat, show, close}: GroupAddMembersDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    dispatch(ChatThunks.addChatMembers({chat, userIds}))
      .unwrap()
      .then(() => {
        close();
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (show) {
      dispatch(ContactsThunks.fetchRelations());
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    setContactIds(relationUserIds);
  }, [show, relations]);

  const isUserIdListEmpty = userIds.length === 0;
  const ignoredIds = chat?.members;

  const content = chat && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <GhostButton
        colorScheme="primary"
        isDisabled={isSubmitting || isUserIdListEmpty}
        isLoading={isSubmitting}
        onPress={addUsers}
      >
        {t('chat:addMembers.buttons.send')}
      </GhostButton>
      <GhostButton onPress={close} colorScheme="secondary" isDisabled={isSubmitting}>
        {t('chat:addMembers.buttons.cancel')}
      </GhostButton>
    </>
  );

  return (
    <ModalDialog
      open={show}
      close={close}
      title={t('chat:addMembers.title')}
      content={content}
      actions={actions}
      size="xl"
    />
  );
};

export default GroupAddMembersDialog;
