import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import ContactsThunks from '../../../store/contacts/contactsThunks';

type ContactListItemProps = {
  relation: ContactRelationWithUser;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    dispatch(ContactsThunks.removeRelation(relation.user.id))
      .unwrap()
      .then(() => dispatch(SnackActions.handleCode('contact.relationRemoved', 'info')))
      .catch(() => setDisabled(false));
  };

  return (
    <FHStack>
      <UserView user={relation.user} withUsername picSize="sm" />
      <SolidButton colorScheme="secondary" isDisabled={disabled} onPress={removeRelation}>
        {t('contact:relations.remove')}
      </SolidButton>
    </FHStack>
  );
};

export default ContactListItem;
