import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import {Group} from '../../../models/Group';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';
import GhostButton from '../../../components/controls/GhostButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactsThunks from '../../../store/contacts/contactsThunks';
import ChatsThunks from '../../../store/chats/chatsThunks';

export type ChatCreateDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
};

export const defaultChatCreateDialogProps: Readonly<ChatCreateDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
};

const ChatCreateDialog = ({group, show, close}: ChatCreateDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createDirect = (): void => {
    dispatch(ChatsThunks.createDirectChat(userIds[0]))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  const createIndirect = (): void => {
    dispatch(ChatsThunks.createIndirectChat(userIds))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  const create = (): void => {
    if (userIds.length === 0) {
      createDirect();
    } else {
      createIndirect();
    }
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
  const ignoredIds = group?.members.map((m) => m.id);

  const content = group && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <GhostButton
        colorScheme="primary"
        isDisabled={isSubmitting || isUserIdListEmpty}
        isLoading={isSubmitting}
        onPress={create}
      >
        {t('group:addMembers.buttons.send')}
      </GhostButton>
      <GhostButton onPress={close} colorScheme="secondary" isDisabled={isSubmitting}>
        {t('group:addMembers.buttons.cancel')}
      </GhostButton>
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

export default ChatCreateDialog;
