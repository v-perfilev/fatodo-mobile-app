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

const ContactListHeader = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();
  const {showContactRequestDialog} = useContactDialogContext();

  const openContactRequestDialog = (): void => {
    showContactRequestDialog();
  };

  return (
    <FHStack defaultSpace alignItems="center">
      <IconButton icon={<UserPlusIcon />} onPress={openContactRequestDialog} />
      <FBox>
        <ClearableTextInput placeholder={t('inputs.filter')} onChangeText={setFilter} />
      </FBox>
    </FHStack>
  );
};

export default ContactListHeader;
