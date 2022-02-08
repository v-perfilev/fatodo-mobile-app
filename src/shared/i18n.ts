import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

import translationEN from '../../assets/locales/en/translation.json';
import translationRU from '../../assets/locales/ru/translation.json';

export const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
];

const resources = {
  en: {
    translation: translationEN,
  },
  ru: {
    translation: translationRU,
  },
};

i18next.use(initReactI18next).init({
  debug: false,
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
