import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ContactThunks from '../../../store/contact/contactThunks';

type IncomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const IncomingRequestListItem = ({request}: IncomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const acceptRequest = (): void => {
    setDisabled(true);
    dispatch(ContactThunks.acceptIncomingRequest(request.user.id))
      .unwrap()
      .then(() => dispatch(SnackActions.handleCode('contact.requestAccepted', 'info')))
      .catch(() => setDisabled(false));
  };

  const declineRequest = (): void => {
    setDisabled(true);
    dispatch(ContactThunks.declineIncomingRequest(request.user.id))
      .unwrap()
      .then(() => dispatch(SnackActions.handleCode('contact.requestDeclined', 'info')))
      .catch(() => setDisabled(false));
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
