import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import {useSnackContext} from '../../../shared/contexts/SnackContext';
import {useContactContext} from '../../../shared/contexts/contactContexts/contactContext';
import {useContactInfoContext} from '../../../shared/contexts/contactContexts/contactInfoContext';
import ContactService from '../../../services/ContactService';
import UserView from '../../../components/views/UserView';
import SolidButton from '../../../components/controls/SolidButton';
import FHStack from '../../../components/surfaces/FHStack';

type ContactListItemProps = {
  relation: ContactRelationWithUser;
};

const ContactListItem = ({relation}: ContactListItemProps) => {
  const {handleCode, handleResponse} = useSnackContext();
  const {update: updateContacts} = useContactContext();
  const {update: updateInfo} = useContactInfoContext();
  const {t} = useTranslation();
  const [disabled, setDisabled] = useState(false);

  const removeRelation = (): void => {
    setDisabled(true);
    ContactService.removeRelation(relation.user.id)
      .then(() => {
        handleCode('contact.relationRemoved', 'info');
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
      <UserView user={relation.user} withUsername picSize="sm" />
      <SolidButton colorScheme="secondary" isDisabled={disabled} onPress={removeRelation}>
        {t('contact:relations.remove')}
      </SolidButton>
    </FHStack>
  );
};

export default ContactListItem;
