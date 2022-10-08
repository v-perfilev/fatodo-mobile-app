import ClearableTextInput from '../../../components/inputs/ClearableTextInput';
import FHStack from '../../../components/boxes/FHStack';
import React, {Dispatch, SetStateAction} from 'react';
import {useTranslation} from 'react-i18next';
import FBox from '../../../components/boxes/FBox';
import {CHATS_FILTER_HEIGHT, HEADER_HEIGHT} from '../../../constants';
import {useColorModeValue} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../../../shared/themes/colors';

type ChatListControlProps = {
  setFilter: Dispatch<SetStateAction<string>>;
};

const ChatListControl = ({setFilter}: ChatListControlProps) => {
  const {t} = useTranslation();

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);
  const inputBg = useColorModeValue('gray.100', 'gray.900');

  return (
    <FHStack
      position="absolute"
      zIndex="1"
      w="100%"
      h={CHATS_FILTER_HEIGHT}
      space="2"
      px="2"
      py="1"
      marginTop={HEADER_HEIGHT}
      alignItems="center"
      bgColor={bg}
    >
      <FBox bg={inputBg} borderRadius="xl">
        <ClearableTextInput
          h="40px"
          px="2"
          variant="unstyled"
          placeholder={t('inputs.filter')}
          placeholderTextColor="gray.400"
          onChangeText={setFilter}
        />
      </FBox>
    </FHStack>
  );
};

export default ChatListControl;
