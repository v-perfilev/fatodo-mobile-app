export const IS_DEVELOPMENT = __DEV__;

// API
export const API_URL = __DEV__ ? 'http://75.119.154.167:4000' : 'http://75.119.154.167:4000';
export const IMAGE_URL = API_URL + '/api/image/store/';
export const WS_URL = API_URL + '/ws/';
export const WS_ROOT_TOPIC = '/user/topic/root';

// TIMEOUTS
export const API_TIMEOUT = 60 * 1000;
// export const SLEEP_MODE_TIMEOUT = 10 * 60 * 1000;
export const SLEEP_MODE_TIMEOUT = 10 * 1000;

// AUTHORIZATION
export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

// CAPTCHA
export const BASE_URL = 'http://75.119.154.167';
***REMOVED***

// HEADER
export const HEADER_HEIGHT = 55;
export const REFRESH_HEIGHT = 150;
export const MAX_REFRESH_HEIGHT = 200;

// AVATARS
export const AVATARS_IN_CARD = 3;

// SKELETONS
export const GROUP_ITEM_SKELETONS_COUNT = 5;
export const ITEM_SKELETONS_HEIGHT = 118;
export const EVENT_SKELETONS_HEIGHT = 82;
export const CONTACT_SKELETONS_HEIGHT = 50;
export const CHATS_SKELETONS_HEIGHT = 64;
export const MESSAGE_SKELETONS_HEIGHT = 150;
export const COMMENT_SKELETONS_HEIGHT = 70;

// IMAGES
export const IMAGE_SIZE = 500;

// FORMS
export const INPUT_FONT_SIZE = 13;

// SPACES
export const DEFAULT_SPACE = 3;
export const SMALL_SPACE = 1;

// CHATS
export const TIMEOUT_BEFORE_MARK_AS_READ = 1000;
export const CHATS_FILTER_HEIGHT = 50;
export const CHATS_INPUT_HEIGHT = 50;

// COMMENTS
export const COMMENTS_INPUT_HEIGHT = 50;

// CALENDAR
export const CALENDAR_LOAD_INDENT = 5;

// BUILDERS
export const ID_STUB = 'ID_STUB';
