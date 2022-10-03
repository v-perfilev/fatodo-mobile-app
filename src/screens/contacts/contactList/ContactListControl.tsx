import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import FBox from '../../../components/boxes/FBox';
import {useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../../../shared/themes/colors';

type ContactListHeaderProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ContactListControl = ({setFilter}: ContactListHeaderProps) => {
  const {t} = useTranslation();

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const inputBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <FHStack zIndex="1" h="50px" space="2" px="2" py="2" alignItems="center" bgColor={bg}>
      <FBox bg={inputBg} borderRadius="2">
        <ClearableTextInput
          h="40px"
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
