import React from 'react';
import {languages} from '../../shared/i18n';
import LanguageIcon from '../icons/LanguageIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import Menu, {MenuItem} from './Menu';
import LinkButton from './LinkButton';

type LanguageMenuItemProps = {
  name: string;
  code: string;
};

const LanguageMenuItem = ({name, code}: LanguageMenuItemProps) => {
  const changeLanguage = (): void => {
    LanguageUtils.setLanguage(code);
  };

  return <MenuItem action={changeLanguage} text={name} />;
};

const LanguageMenu = () => {
  const languageCode = LanguageUtils.getLanguage();
  const language = languages.find((l) => l.code === languageCode).name;

  return (
    <Menu
      trigger={(triggerProps) => (
        <LinkButton leftIcon={<LanguageIcon />} {...triggerProps}>
          {language}
        </LinkButton>
      )}
    >
      {languages.map((lang) => (
        <LanguageMenuItem name={lang.name} code={lang.code} key={lang.code} />
      ))}
    </Menu>
  );
};

export default LanguageMenu;
