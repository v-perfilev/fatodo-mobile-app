import React, {useState} from 'react';
import {ContactRequestWithUser} from '../../../models/ContactRequest';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/surfaces/FHStack';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ContactsThunks from '../../../store/contacts/contactsThunks';

type OutcomingRequestListItemProps = {
  request: ContactRequestWithUser;
};

const OutcomingRequestListItem = ({request}: OutcomingRequestListItemProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRequest = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeOutcomingRequest(request.user.id))
      .unwrap()
      .then(() => dispatch(SnackActions.handleCode('contact.requestRemoved', 'info')))
      .catch(() => setDisabled(false));
  };

  return (
    <FHStack defaultSpace>
      <FHStack grow>
        <UserView user={request.user} withUsername picSize="sm" />
      </FHStack>
      <SolidButton colorScheme="secondary" size="sm" isDisabled={disabled} onPress={removeRequest}>
        {t('contact:outcoming.remove')}
      </SolidButton>
    </FHStack>
  );
};

export default OutcomingRequestListItem;
