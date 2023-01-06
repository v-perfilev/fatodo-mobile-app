import {Dimensions, Platform} from 'react-native';

export const IS_DEVELOPMENT = __DEV__;

// API
export const API_URL = __DEV__ ? 'https://fatodo-stage-api.persoff68.com' : 'https://api.fatodo.app';
export const IMAGE_URL = API_URL + '/api/image/store/';
export const WS_URL = API_URL + '/ws/';
export const WS_ROOT_TOPIC = '/user/topic/root';

// TIMEOUTS
export const API_TIMEOUT = 60 * 1000;
export const MARK_AS_READ_TIMEOUT = 1000;
export const FLAT_LIST_REFRESH_TIMEOUT = 5 * 1000;

// AUTHORIZATION
export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

// CAPTCHA
export const BASE_URL = 'https://fatodo.app';
***REMOVED***

// HEADER AND TAB
export const HEADER_HEIGHT = 55;
export const REFRESH_HEIGHT = 150;
export const MAX_REFRESH_HEIGHT = 200;
export const TAB_HEIGHT = Platform.OS === 'android' ? 50 : 60;

// KEYBOARD AVOIDING
export const KEYBOARD_OFFSET = Platform.OS === 'android' ? 0 : 45;

// DEFAULT
export const DEFAULT_MARGIN = 8;

// LIST
export const DEFAULT_FLAT_LIST_ITEM_HEIGHT = 100;

// AVATARS
export const AVATARS_IN_CARD = 3;

// SKELETONS
export const GROUP_ITEM_SKELETONS_COUNT = 5;
export const ITEM_SKELETON_HEIGHT = 122;
export const EVENT_SKELETON_HEIGHT = 131;
export const CONTACT_SKELETON_HEIGHT = 64;
export const CHAT_SKELETON_HEIGHT = 64;
export const MESSAGE_SKELETON_HEIGHT = 84;
export const COMMENT_SKELETON_HEIGHT = 84;

// IMAGES
export const IMAGE_SIZE = 500;

// FORMS
export const INPUT_MIN_HEIGHT = 45;

// CONTACTS
export const CONTACTS_FILTER_HEIGHT = 50;

// CHATS
export const CHATS_FILTER_HEIGHT = 50;
export const CHATS_INPUT_HEIGHT = 50;

// COMMENTS
export const COMMENTS_INPUT_HEIGHT = 50;

// CALENDAR
export const CALENDAR_TITLE_HEIGHT = 40;
export const CALENDAR_WEEKDAYS_HEIGHT = 40;
export const CALENDAR_DATE_HEIGHT = Math.max(65, Math.min(100, Dimensions.get('window').width / 7));
export const CALENDAR_MARGIN_HEIGHT = 10;
export const CALENDAR_LOAD_INDENT = 5;

// BUILDERS
export const ID_STUB = 'ID_STUB';
