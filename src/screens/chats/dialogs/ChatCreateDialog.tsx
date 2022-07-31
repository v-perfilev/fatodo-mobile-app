import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';
import GhostButton from '../../../components/controls/GhostButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ChatsThunks} from '../../../store/chats/chatsActions';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import AuthSelectors from '../../../store/auth/authSelectors';
import OutlinedButton from '../../../components/controls/OutlinedButton';

export type ChatCreateDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultChatCreateDialogProps: Readonly<ChatCreateDialogProps> = {
  show: false,
  close: (): void => null,
};

const ChatCreateDialog = ({show, close}: ChatCreateDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const account = useAppSelector(AuthSelectors.account);
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
    setIsSubmitting(true);
    if (userIds.length === 1) {
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
  const ignoredIds = [account?.id];

  const content = <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <GhostButton onPress={close} colorScheme="secondary" isDisabled={isSubmitting}>
        {t('chat:createChat.cancel')}
      </GhostButton>
      <OutlinedButton
        colorScheme="primary"
        isDisabled={isSubmitting || isUserIdListEmpty}
        isLoading={isSubmitting}
        onPress={create}
      >
        {t('chat:createChat.send')}
      </OutlinedButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('chat:createChat.title')} content={content} actions={actions} />
  );
};

export default ChatCreateDialog;
