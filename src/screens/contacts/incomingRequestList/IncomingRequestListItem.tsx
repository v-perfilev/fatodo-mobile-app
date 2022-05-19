import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useContactInfoContext} from '../../../shared/contexts/contactContexts/contactInfoContext';
import ContactService from '../../../services/ContactService';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';

type IncomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    ContactService.acceptRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestAccepted', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setDisabled(false);
      });
  };

  const declineRequest = (): void => {
    setDisabled(true);
    ContactService.declineRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestDeclined', 'info');
        updateInfo();
        updateContacts();
      })
      .catch((response) => {
        handleResponse(response);
        setDisabled(false);
      });
  };

  return (
    <FHStack>
      <UserView user={request.user} withUsername picSize="sm" />
      <SolidButton colorScheme="primary" isDisabled={disabled} onPress={acceptRequest}>
        {t('contact:incoming.accept')}
      </SolidButton>
      <SolidButton colorScheme="secondary" isDisabled={disabled} onPress={declineRequest}>
        {t('contact:incoming.decline')}
      </SolidButton>
    </FHStack>
  );
};

export default IncomingRequestListItem;
