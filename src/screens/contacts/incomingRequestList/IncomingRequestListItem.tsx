import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useContactInfoContext} from '../../../shared/contexts/contactContexts/contactInfoContext';
import ContactService from '../../../services/ContactService';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useAppDispatch} from '../../../store/hooks';
import SnackActions from '../../../store/snack/snackActions';

type IncomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    ContactService.acceptRequest(request.user.id)
      .then(() => {
        dispatch(SnackActions.handleCode('contact.requestAccepted', 'info'));
        updateInfo();
        updateContacts();
      })
      .catch(() => {
        setDisabled(false);
      });
  };

  const declineRequest = (): void => {
    setDisabled(true);
    ContactService.declineRequest(request.user.id)
      .then(() => {
        dispatch(SnackActions.handleCode('contact.requestDeclined', 'info'));
        updateInfo();
        updateContacts();
      })
      .catch(() => {
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
