import IconButton from '../../../components/controls/IconButton';
import UserPlusIcon from '../../../components/icons/UserPlusIcon';
import {Box} from 'native-base';
import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/surfaces/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import {useContactDialogContext} from '../../../shared/contexts/dialogContexts/ContactDialogContext';

type ContactListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ContactListHeader = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();
  const {showContactRequestDialog} = useContactDialogContext();

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  return (
    <FHStack defaultSpace alignItems="center">
      <IconButton icon={<UserPlusIcon />} onPress={openContactRequestDialog} />
      <Box flex={1}>
        <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={setFilter} />
      </Box>
    </FHStack>
  );
};

export default ContactListHeader;
