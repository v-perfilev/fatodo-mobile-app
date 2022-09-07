import React from 'react';
import {languages} from '../../shared/i18n';
import LanguageIcon from '../icons/LanguageIcon';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import Menu, {MenuItem} from './Menu';
import LinkButton from './LinkButton';
import {DateUtils} from '../../shared/utils/DateUtils';

type LanguageMenuProps = {
  onChange?: (code: string) => void;
};

type LanguageMenuItemProps = {
  name: string;
  code: string;
  onChange?: (code: string) => void;
};

const LanguageMenuItem = ({name, code, onChange}: LanguageMenuItemProps) => {
  const changeLanguage = (): void => {
    DateUtils.resetLocale(code);
    LanguageUtils.setLanguage(code);
    onChange && onChange(code);
  };

  return <MenuItem action={changeLanguage} text={name} />;
};

const LanguageMenu = ({onChange}: LanguageMenuProps) => {
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
        <LanguageMenuItem name={lang.name} code={lang.code} onChange={onChange} key={lang.code} />
      ))}
    </Menu>
  );
};

export default LanguageMenu;
