import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useContactInfoContext} from '../../../shared/contexts/contactContexts/contactInfoContext';
import ContactService from '../../../services/ContactService';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';
import {useAppDispatch} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';

type ContactListItemProps = {
  relation: ContactRelationWithUser;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const dispatch = useAppDispatch();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    ContactService.removeRelation(relation.user.id)
      .then(() => {
        dispatch(SnackActions.handleCode('contact.relationRemoved', 'info'));
        updateInfo();
        updateContacts();
      })
      .catch(() => {
        setDisabled(false);
      });
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
