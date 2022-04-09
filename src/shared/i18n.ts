import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// translation
import translationEN from '../../assets/locales/en/translation.json';
import translationRU from '../../assets/locales/ru/translation.json';
// common
import commonEN from '../../assets/locales/en/common.json';
import commonRU from '../../assets/locales/ru/common.json';
// account
import accountEN from '../../assets/locales/en/account.json';
import accountRU from '../../assets/locales/ru/account.json';
// feedback
import feedbackEN from '../../assets/locales/en/feedback.json';
import feedbackRU from '../../assets/locales/ru/feedback.json';

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
    common: commonEN,
    account: accountEN,
    feedback: feedbackEN,
  },
  ru: {
    translation: translationRU,
    common: commonRU,
    account: accountRU,
    feedback: feedbackRU,
  },
};

i18next.use(initReactI18next).init({
  debug: false,
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  ns: ['translation', 'common', 'account', 'feedback'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
