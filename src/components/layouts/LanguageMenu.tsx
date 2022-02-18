import React, {FC} from 'react';
import {HStack, Menu, Pressable, Text} from 'native-base';
import {languages} from '../../shared/i18n';
import LanguageIcon from '../icons/LanguageIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';

type LanguageMenuProps = {
  space?: string;
};

type LanguageMenuItemProps = {
  name: string;
  code: string;
};

type LanguageMenuButtonProps = {
  space: string;
};

const LanguageMenuButton: FC<LanguageMenuButtonProps> = ({space}) => {
  const languageCode = LanguageUtils.getLanguage();
  const language = languages.find((l) => l.code === languageCode).name;

  return (
    <HStack space={space} alignItems="center">
      <LanguageIcon size="7" color="primary.500" />
      <Text fontWeight="600" fontSize="16" color="primary.500">
        {language}
      </Text>
    </HStack>
  );
};

const LanguageMenuItem: FC<LanguageMenuItemProps> = ({name, code}) => {
  const changeLanguage = (): void => {
    LanguageUtils.setLanguage(code);
  };

  return <Menu.Item onPress={changeLanguage}>{name}</Menu.Item>;
};

const LanguageMenu: FC<LanguageMenuProps> = ({space = '2'}) => {
  return (
    <Menu
      defaultIsOpen={false}
      trigger={(triggerProps) => (
        <Pressable {...triggerProps} _pressed={{opacity: 0.5}}>
          <LanguageMenuButton space={space} />
        </Pressable>
      )}
    >
      {languages.map((lang) => (
        <LanguageMenuItem name={lang.name} code={lang.code} key={lang.code} />
      ))}
    </Menu>
  );
};

export default LanguageMenu;
