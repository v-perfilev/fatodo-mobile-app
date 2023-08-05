import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// translation
import translationEN from '../../assets/locales/en/translation.json';
import translationES from '../../assets/locales/es/translation.json';
import translationRU from '../../assets/locales/ru/translation.json';
// common
import commonEN from '../../assets/locales/en/common.json';
import commonES from '../../assets/locales/es/common.json';
import commonRU from '../../assets/locales/ru/common.json';
// account
import accountEN from '../../assets/locales/en/account.json';
import accountES from '../../assets/locales/es/account.json';
import accountRU from '../../assets/locales/ru/account.json';
// feedback
import feedbackEN from '../../assets/locales/en/feedback.json';
import feedbackES from '../../assets/locales/es/feedback.json';
import feedbackRU from '../../assets/locales/ru/feedback.json';
// snack
import snackEN from '../../assets/locales/en/snack.json';
import snackES from '../../assets/locales/es/snack.json';
import snackRU from '../../assets/locales/ru/snack.json';
// group
import groupEN from '../../assets/locales/en/group.json';
import groupES from '../../assets/locales/es/group.json';
import groupRU from '../../assets/locales/ru/group.json';
// item
import itemEN from '../../assets/locales/en/item.json';
import itemES from '../../assets/locales/es/item.json';
import itemRU from '../../assets/locales/ru/item.json';
// contact
import contactEN from '../../assets/locales/en/contact.json';
import contactES from '../../assets/locales/es/contact.json';
import contactRU from '../../assets/locales/ru/contact.json';
// chat
import chatEN from '../../assets/locales/en/chat.json';
import chatES from '../../assets/locales/es/chat.json';
import chatRU from '../../assets/locales/ru/chat.json';
// comment
import commentEN from '../../assets/locales/en/comment.json';
import commentES from '../../assets/locales/es/comment.json';
import commentRU from '../../assets/locales/ru/comment.json';
// user
import userEN from '../../assets/locales/en/user.json';
import userES from '../../assets/locales/es/user.json';
import userRU from '../../assets/locales/ru/user.json';
// event
import eventEN from '../../assets/locales/en/event.json';
import eventES from '../../assets/locales/es/event.json';
import eventRU from '../../assets/locales/ru/event.json';
// calendar
import calendarEN from '../../assets/locales/en/calendar.json';
import calendarES from '../../assets/locales/es/calendar.json';
import calendarRU from '../../assets/locales/ru/calendar.json';
// push
import pushEN from '../../assets/locales/en/push.json';
import pushES from '../../assets/locales/es/push.json';
import pushRU from '../../assets/locales/ru/push.json';
// list
import listEN from '../../assets/locales/en/list.json';
import listES from '../../assets/locales/es/list.json';
import listRU from '../../assets/locales/ru/list.json';

require('moment/locale/en-gb.js');
require('moment/locale/es.js');
require('moment/locale/ru.js');

export const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Español',
    code: 'es',
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
    comment: commentEN,
    user: userEN,
    event: eventEN,
    calendar: calendarEN,
    push: pushEN,
    list: listEN,
  },
  es: {
    translation: translationES,
    common: commonES,
    account: accountES,
    feedback: feedbackES,
    snack: snackES,
    group: groupES,
    item: itemES,
    contact: contactES,
    chat: chatES,
    comment: commentES,
    user: userES,
    event: eventES,
    calendar: calendarES,
    push: pushES,
    list: listES,
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
    comment: commentRU,
    user: userRU,
    event: eventRU,
    calendar: calendarRU,
    push: pushRU,
    list: listRU,
  },
};

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    compatibilityJSON: 'v3',
    resources,
    lng: 'en',
    ns: [
      'translation',
      'common',
      'account',
      'feedback',
      'snack',
      'group',
      'item',
      'contact',
      'chat',
      'user',
      'event',
      'calendar',
      'list',
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .finally();

export default i18next;
