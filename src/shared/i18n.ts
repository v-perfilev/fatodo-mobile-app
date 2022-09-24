import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
// translation
import translationEN from '../../assets/locales/EN/translation.json';
import translationRU from '../../assets/locales/RU/translation.json';
// common
import commonEN from '../../assets/locales/EN/common.json';
import commonRU from '../../assets/locales/RU/common.json';
// account
import accountEN from '../../assets/locales/EN/account.json';
import accountRU from '../../assets/locales/RU/account.json';
// feedback
import feedbackEN from '../../assets/locales/EN/feedback.json';
import feedbackRU from '../../assets/locales/RU/feedback.json';
// snack
import snackEN from '../../assets/locales/EN/snack.json';
import snackRU from '../../assets/locales/RU/snack.json';
// group
import groupEN from '../../assets/locales/EN/group.json';
import groupRU from '../../assets/locales/RU/group.json';
// item
import itemEN from '../../assets/locales/EN/item.json';
import itemRU from '../../assets/locales/RU/item.json';
// contact
import contactEN from '../../assets/locales/EN/contact.json';
import contactRU from '../../assets/locales/RU/contact.json';
// chat
import chatEN from '../../assets/locales/EN/chat.json';
import chatRU from '../../assets/locales/RU/chat.json';
// comment
import commentEN from '../../assets/locales/EN/comment.json';
import commentRU from '../../assets/locales/RU/comment.json';
// user
import userEN from '../../assets/locales/EN/user.json';
import userRU from '../../assets/locales/RU/user.json';
// event
import eventEN from '../../assets/locales/EN/event.json';
import eventRU from '../../assets/locales/RU/event.json';
// calendar
import calendarEN from '../../assets/locales/EN/calendar.json';
import calendarRU from '../../assets/locales/RU/calendar.json';
// push
import pushEN from '../../assets/locales/EN/push.json';
import pushRU from '../../assets/locales/RU/push.json';

require('moment/locale/en-gb.js');
require('moment/locale/ru.js');

export const languages = [
  {
    name: 'English',
    code: 'EN',
  },
  {
    name: 'Русский',
    code: 'RU',
  },
];

const resources = {
  EN: {
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
  },
  RU: {
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
  },
};

i18next
  .use(initReactI18next)
  .init({
    debug: false,
    compatibilityJSON: 'v3',
    resources,
    lng: 'EN',
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
    ],
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  })
  .finally();

export default i18next;
