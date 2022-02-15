import React, {FC} from 'react';
import {HStack, Menu, Pressable, Text} from 'native-base';
import {useTranslation} from 'react-i18next';
import LanguageIcon from '../icons/LanguageIcon';
import {languages} from '../../shared/i18n';

type LanguageMenuItemProps = {
  name: string;
  code: string;
};

const LanguageMenuButton: FC = () => {
  const {i18n} = useTranslation();
  const language = languages.find((l) => l.code === i18n.language).name;

  return (
    <HStack space="5" alignItems="center">
      <LanguageIcon size="7" color="primary.500" />
      <Text fontWeight="600" fontSize="16" color="primary.500">
        {language}
      </Text>
    </HStack>
  );
};

const LanguageMenuItem: FC<LanguageMenuItemProps> = ({name, code}) => {
  const {i18n} = useTranslation();

  const changeLanguage = (): void => {
    i18n.changeLanguage(code).catch(console.log);
  };

  return <Menu.Item onPress={changeLanguage}>{name}</Menu.Item>;
};

const LanguageMenu: FC = () => {
  return (
    <Menu
      defaultIsOpen={false}
      trigger={(triggerProps) => (
        <Pressable {...triggerProps}>
          <LanguageMenuButton />
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
