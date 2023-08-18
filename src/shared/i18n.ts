import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';

// translation
import translationEN from '../../assets/locales/en/translation.json';
import translationDE from '../../assets/locales/de/translation.json';
import translationES from '../../assets/locales/es/translation.json';
import translationFR from '../../assets/locales/fr/translation.json';
import translationPT from '../../assets/locales/pt/translation.json';
import translationRU from '../../assets/locales/ru/translation.json';
import translationUK from '../../assets/locales/uk/translation.json';
// common
import commonEN from '../../assets/locales/en/common.json';
import commonDE from '../../assets/locales/de/common.json';
import commonES from '../../assets/locales/es/common.json';
import commonFR from '../../assets/locales/fr/common.json';
import commonPT from '../../assets/locales/pt/common.json';
import commonRU from '../../assets/locales/ru/common.json';
import commonUK from '../../assets/locales/uk/common.json';
// account
import accountEN from '../../assets/locales/en/account.json';
import accountDE from '../../assets/locales/de/account.json';
import accountES from '../../assets/locales/es/account.json';
import accountFR from '../../assets/locales/fr/account.json';
import accountPT from '../../assets/locales/pt/account.json';
import accountRU from '../../assets/locales/ru/account.json';
import accountUK from '../../assets/locales/uk/account.json';
// feedback
import feedbackEN from '../../assets/locales/en/feedback.json';
import feedbackDE from '../../assets/locales/de/feedback.json';
import feedbackES from '../../assets/locales/es/feedback.json';
import feedbackFR from '../../assets/locales/fr/feedback.json';
import feedbackPT from '../../assets/locales/pt/feedback.json';
import feedbackRU from '../../assets/locales/ru/feedback.json';
import feedbackUK from '../../assets/locales/uk/feedback.json';
// snack
import snackEN from '../../assets/locales/en/snack.json';
import snackDE from '../../assets/locales/de/snack.json';
import snackES from '../../assets/locales/es/snack.json';
import snackFR from '../../assets/locales/fr/snack.json';
import snackPT from '../../assets/locales/pt/snack.json';
import snackRU from '../../assets/locales/ru/snack.json';
import snackUK from '../../assets/locales/uk/snack.json';
// group
import groupEN from '../../assets/locales/en/group.json';
import groupDE from '../../assets/locales/de/group.json';
import groupES from '../../assets/locales/es/group.json';
import groupFR from '../../assets/locales/fr/group.json';
import groupPT from '../../assets/locales/pt/group.json';
import groupRU from '../../assets/locales/ru/group.json';
import groupUK from '../../assets/locales/uk/group.json';
// item
import itemEN from '../../assets/locales/en/item.json';
import itemDE from '../../assets/locales/de/item.json';
import itemES from '../../assets/locales/es/item.json';
import itemFR from '../../assets/locales/fr/item.json';
import itemPT from '../../assets/locales/pt/item.json';
import itemRU from '../../assets/locales/ru/item.json';
import itemUK from '../../assets/locales/uk/item.json';
// contact
import contactEN from '../../assets/locales/en/contact.json';
import contactDE from '../../assets/locales/de/contact.json';
import contactES from '../../assets/locales/es/contact.json';
import contactFR from '../../assets/locales/fr/contact.json';
import contactPT from '../../assets/locales/pt/contact.json';
import contactRU from '../../assets/locales/ru/contact.json';
import contactUK from '../../assets/locales/uk/contact.json';
// chat
import chatEN from '../../assets/locales/en/chat.json';
import chatDE from '../../assets/locales/de/chat.json';
import chatES from '../../assets/locales/es/chat.json';
import chatFR from '../../assets/locales/fr/chat.json';
import chatPT from '../../assets/locales/pt/chat.json';
import chatRU from '../../assets/locales/ru/chat.json';
import chatUK from '../../assets/locales/uk/chat.json';
// comment
import commentEN from '../../assets/locales/en/comment.json';
import commentDE from '../../assets/locales/de/comment.json';
import commentES from '../../assets/locales/es/comment.json';
import commentFR from '../../assets/locales/fr/comment.json';
import commentPT from '../../assets/locales/pt/comment.json';
import commentRU from '../../assets/locales/ru/comment.json';
import commentUK from '../../assets/locales/uk/comment.json';
// user
import userEN from '../../assets/locales/en/user.json';
import userDE from '../../assets/locales/de/user.json';
import userES from '../../assets/locales/es/user.json';
import userFR from '../../assets/locales/fr/user.json';
import userPT from '../../assets/locales/pt/user.json';
import userRU from '../../assets/locales/ru/user.json';
import userUK from '../../assets/locales/uk/user.json';
// event
import eventEN from '../../assets/locales/en/event.json';
import eventDE from '../../assets/locales/de/event.json';
import eventES from '../../assets/locales/es/event.json';
import eventFR from '../../assets/locales/fr/event.json';
import eventPT from '../../assets/locales/pt/event.json';
import eventRU from '../../assets/locales/ru/event.json';
import eventUK from '../../assets/locales/uk/event.json';
// calendar
import calendarEN from '../../assets/locales/en/calendar.json';
import calendarDE from '../../assets/locales/de/calendar.json';
import calendarES from '../../assets/locales/es/calendar.json';
import calendarFR from '../../assets/locales/fr/calendar.json';
import calendarPT from '../../assets/locales/pt/calendar.json';
import calendarRU from '../../assets/locales/ru/calendar.json';
import calendarUK from '../../assets/locales/uk/calendar.json';
// push
import pushEN from '../../assets/locales/en/push.json';
import pushDE from '../../assets/locales/de/push.json';
import pushES from '../../assets/locales/es/push.json';
import pushFR from '../../assets/locales/fr/push.json';
import pushPT from '../../assets/locales/pt/push.json';
import pushRU from '../../assets/locales/ru/push.json';
import pushUK from '../../assets/locales/uk/push.json';
// list
import listEN from '../../assets/locales/en/list.json';
import listDE from '../../assets/locales/de/list.json';
import listES from '../../assets/locales/es/list.json';
import listFR from '../../assets/locales/fr/list.json';
import listPT from '../../assets/locales/pt/list.json';
import listRU from '../../assets/locales/ru/list.json';
import listUK from '../../assets/locales/uk/list.json';

require('moment/locale/en-gb');
require('moment/locale/de');
require('moment/locale/es');
require('moment/locale/fr');
require('moment/locale/pt');
require('moment/locale/ru');
require('moment/locale/uk');

export const languages = [
  {
    name: 'English',
    code: 'en',
  },
  {
    name: 'Deutsch',
    code: 'de',
  },
  {
    name: 'Español',
    code: 'es',
  },
  {
    name: 'Français',
    code: 'fr',
  },
  {
    name: 'Português',
    code: 'pt',
  },
  {
    name: 'Русский',
    code: 'ru',
  },
  {
    name: 'Українська',
    code: 'uk',
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
  de: {
    translation: translationDE,
    common: commonDE,
    account: accountDE,
    feedback: feedbackDE,
    snack: snackDE,
    group: groupDE,
    item: itemDE,
    contact: contactDE,
    chat: chatDE,
    comment: commentDE,
    user: userDE,
    event: eventDE,
    calendar: calendarDE,
    push: pushDE,
    list: listDE,
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
  fr: {
    translation: translationFR,
    common: commonFR,
    account: accountFR,
    feedback: feedbackFR,
    snack: snackFR,
    group: groupFR,
    item: itemFR,
    contact: contactFR,
    chat: chatFR,
    comment: commentFR,
    user: userFR,
    event: eventFR,
    calendar: calendarFR,
    push: pushFR,
    list: listFR,
  },
  pt: {
    translation: translationPT,
    common: commonPT,
    account: accountPT,
    feedback: feedbackPT,
    snack: snackPT,
    group: groupPT,
    item: itemPT,
    contact: contactPT,
    chat: chatPT,
    comment: commentPT,
    user: userPT,
    event: eventPT,
    calendar: calendarPT,
    push: pushPT,
    list: listPT,
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
  uk: {
    translation: translationUK,
    common: commonUK,
    account: accountUK,
    feedback: feedbackUK,
    snack: snackUK,
    group: groupUK,
    item: itemUK,
    contact: contactUK,
    chat: chatUK,
    comment: commentUK,
    user: userUK,
    event: eventUK,
    calendar: calendarUK,
    push: pushUK,
    list: listUK,
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
