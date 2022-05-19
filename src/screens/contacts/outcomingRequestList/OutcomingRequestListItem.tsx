import React, {useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import ContactService from '../../../services/ContactService';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import {useTranslation} from 'react-i18next';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useContactInfoContext} from '../../../shared/contexts/contactContexts/contactInfoContext';
import FHStack from '../../../components/surfaces/FHStack';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';

type OutcomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const OutcomingRequestListItem = ({request}: OutcomingRequestListItemProps) => {
  const {t} = useTranslation();
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    ContactService.removeRequest(request.user.id)
      .then(() => {
        handleCode('contact.requestRemoved', 'info');
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
      <SolidButton colorScheme="secondary" isDisabled={disabled} onPress={removeRequest}>
        {t('contact:outcoming.remove')}
      </SolidButton>
    </FHStack>
  );
};

export default OutcomingRequestListItem;
