import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import FBox from '../../../components/boxes/FBox';

type ContactListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ContactListControl = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();

  return (
    <FHStack
      zIndex="1"
      h="50px"
      space="2"
      px="2"
      py="2"
      alignItems="center"
      bgColor="white"
      borderBottomWidth="1"
      borderBottomColor="gray.200"
    >
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
