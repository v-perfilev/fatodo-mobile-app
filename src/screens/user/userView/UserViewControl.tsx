import React from 'react';
import {useChatDialogContext} from '../../../shared/contexts/dialogContexts/ChatDialogContext';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {User} from '../../../models/User';
import {ContactsThunks} from '../../../store/contacts/contactsActions';
import {ContactRequestDTO} from '../../../models/dto/ContactRequestDTO';
import FVStack from '../../../components/boxes/FVStack';
import {ContactUtils} from '../../../shared/utils/ContactUtils';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/boxes/FHStack';
import SolidButton from '../../../components/controls/SolidButton';
import MailIcon from '../../../components/icons/MailIcon';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import UserCancelIcon from '../../../components/icons/UserCancelIcon';
import UserWaitIcon from '../../../components/icons/UserWaitIcon';
import UserMinusIcon from '../../../components/icons/UserMinusIcon';

type UserViewControlProps = {
  user: User;
};

const UserViewControl = ({user}: UserViewControlProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {showDirectMessageDialog} = useChatDialogContext();
  const [loading, setLoading] = useDelayedState(false);
  const relations = useAppSelector(ContactsSelectors.relations);
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);

  const isContact = ContactUtils.isContact(user, relations);
  const isOutcomingRequest = ContactUtils.isOutcomingRequest(user, outcomingRequests);
  const isIncomingRequest = ContactUtils.isIncomingRequest(user, incomingRequests);

  const sendContactRequest = (): void => {
    const dto = {recipientId: user.id} as ContactRequestDTO;
    setLoading(true);
    dispatch(ContactsThunks.sendRequest(dto)).then(() => setLoading(false));
  };

  const removeContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsThunks.removeOutcomingRequest(user.id)).then(() => setLoading(false));
  };

  const acceptContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsThunks.acceptIncomingRequest(user.id)).then(() => setLoading(false));
  };

  const declineContactRequest = (): void => {
    setLoading(true);
    dispatch(ContactsThunks.declineIncomingRequest(user.id)).then(() => setLoading(false));
  };

  const removeContact = (): void => {
    setLoading(true);
    dispatch(ContactsThunks.removeRelation(user.id)).then(() => setLoading(false));
  };

  const openDirectMessageDialog = (): void => {
    showDirectMessageDialog(user);
  };

  return (
    <FVStack defaultSpace>
      {!isContact && !isOutcomingRequest && !isIncomingRequest && (
        <SolidButton
          colorScheme="primary"
          leftIcon={<UserPlusIcon size="md" />}
          isDisabled={loading}
          onPress={sendContactRequest}
        >
          {t('user:actions.sendContactRequest')}
        </SolidButton>
      )}
      {isOutcomingRequest && (
        <FHStack defaultSpace>
          <SolidButton colorScheme="primary" leftIcon={<UserWaitIcon size="md" />} isDisabled>
            {t('user:actions.waitContactAccepting')}
          </SolidButton>
          <SolidButton
            colorScheme="secondary"
            leftIcon={<UserCancelIcon size="md" />}
            isDisabled={loading}
            onPress={removeContactRequest}
          >
            {t('user:actions.cancelContactRequest')}
          </SolidButton>
        </FHStack>
      )}
      {isIncomingRequest && (
        <FHStack defaultSpace>
          <SolidButton
            colorScheme="primary"
            leftIcon={<UserPlusIcon size="md" />}
            isDisabled={loading}
            onPress={acceptContactRequest}
          >
            {t('user:actions.acceptContactRequest')}
          </SolidButton>
          <SolidButton
            colorScheme="secondary"
            leftIcon={<UserCancelIcon size="md" />}
            isDisabled={loading}
            onPress={declineContactRequest}
          >
            {t('user:actions.declineContactRequest')}
          </SolidButton>
        </FHStack>
      )}
      {isContact && (
        <SolidButton
          colorScheme="secondary"
          leftIcon={<UserMinusIcon size="md" />}
          isDisabled={loading}
          onPress={removeContact}
        >
          {t('user:actions.removeContact')}
        </SolidButton>
      )}
      <SolidButton colorScheme="primary" leftIcon={<MailIcon size="md" />} onPress={openDirectMessageDialog}>
        {t('user:actions.sendMessage')}
      </SolidButton>
    </FVStack>
  );
};

export default UserViewControl;
