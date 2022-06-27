import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';
import FBox from '../../../components/boxes/FBox';
import IconButton from '../../../components/controls/IconButton';

type ContactListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ContactListControl = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();
  const {showContactRequestDialog} = useContactDialogContext();

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  return (
    <FHStack h="50px" space="2" px="2" py="2" alignItems="center" borderBottomWidth="1" borderBottomColor="gray.200">
      <IconButton icon={<UserPlusIcon />} onPress={openContactRequestDialog} />
      <FBox>
        <ClearableTextInput
          h="36px"
          px="2"
          variant="unstyled"
          placeholder={t('inputs.filter')}
          onChangeText={setFilter}
        />
      </FBox>
    </FHStack>
  );
};

export default ContactListControl;
