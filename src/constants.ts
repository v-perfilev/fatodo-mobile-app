export const IS_DEVELOPMENT = __DEV__;

// API
export const API_URL = __DEV__ ? 'http://75.119.154.167:4000' : 'http://75.119.154.167:4000';
export const IMAGE_URL = API_URL + '/api/image/store/';
export const WS_URL = API_URL + '/ws/';
export const WS_ROOT_TOPIC = '/user/topic/root';

// TIMEOUTS
export const API_TIMEOUT = 60 * 1000;
export const SAME_DATE_TIMEOUT = 5 * 1000;
export const MARK_AS_READ_TIMEOUT = 1000;
export const FLAT_LIST_REFRESH_TIMEOUT = 5 * 1000;

// AUTHORIZATION
export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

// CAPTCHA
export const BASE_URL = 'http://75.119.154.167';
***REMOVED***

// HEADER AND TAB
export const HEADER_HEIGHT = 55;
export const REFRESH_HEIGHT = 150;
export const MAX_REFRESH_HEIGHT = 200;
export const TAB_HEIGHT = 50;

// LIST
export const DEFAULT_FLAT_LIST_ITEM_HEIGHT = 100;

// AVATARS
export const AVATARS_IN_CARD = 3;

// SKELETONS
export const GROUP_ITEM_SKELETONS_COUNT = 5;
export const ITEM_SKELETON_HEIGHT = 118;
export const EVENT_SKELETON_HEIGHT = 127;
export const CONTACT_SKELETON_HEIGHT = 64;
export const CHAT_SKELETON_HEIGHT = 64;
export const MESSAGE_SKELETON_HEIGHT = 74;
export const COMMENT_SKELETON_HEIGHT = 74;

// IMAGES
export const IMAGE_SIZE = 500;

// FORMS
export const INPUT_MIN_HEIGHT = 45;
export const INPUT_FONT_SIZE = 13;

// SPACES
export const DEFAULT_SPACE = 3;
export const SMALL_SPACE = 1;

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
export const CALENDAR_DATE_HEIGHT = 65;
export const CALENDAR_MARGIN_HEIGHT = 10;
export const CALENDAR_LOAD_INDENT = 5;

// BUILDERS
export const ID_STUB = 'ID_STUB';
