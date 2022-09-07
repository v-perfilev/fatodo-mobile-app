import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import FBox from '../../../components/boxes/FBox';

type ChatListControlProps = {
  setFilter: Dispatch<SetStateAction<string>>;
  marginTop?: number;
};

const ChatListControl = ({setFilter, marginTop}: ChatListControlProps) => {
  const {t} = useTranslation();

  return (
    <FHStack zIndex="1" h="50px" space="2" px="2" marginTop={marginTop} py="1" alignItems="center" bgColor="white">
      <FBox bg="gray.100" borderRadius="2">
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

export default ChatListControl;
