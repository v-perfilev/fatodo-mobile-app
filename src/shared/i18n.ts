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
// snack
import snackEN from '../../assets/locales/en/snack.json';
import snackRU from '../../assets/locales/ru/snack.json';
// group
import groupEN from '../../assets/locales/en/group.json';
import groupRU from '../../assets/locales/ru/group.json';
// item
import itemEN from '../../assets/locales/en/item.json';
import itemRU from '../../assets/locales/ru/item.json';
// contact
import contactEN from '../../assets/locales/en/contact.json';
import contactRU from '../../assets/locales/ru/contact.json';
// chat
import chatEN from '../../assets/locales/en/chat.json';
import chatRU from '../../assets/locales/ru/chat.json';

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
    snack: snackEN,
    group: groupEN,
    item: itemEN,
    contact: contactEN,
    chat: chatEN,
  },
  ru: {
    translation: translationRU,
    common: commonRU,
    account: accountRU,
    feedback: feedbackRU,
    snack: snackRU,
    group: groupRU,
    item: itemRU,
    contact: contactRU,
    chat: chatRU,
  },
};

i18next.use(initReactI18next).init({
  debug: false,
  compatibilityJSON: 'v3',
  resources,
  lng: 'en',
  ns: ['translation', 'common', 'account', 'feedback', 'snack', 'group', 'item', 'contact', 'chat'],
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18next;
