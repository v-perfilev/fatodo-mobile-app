export const IS_DEVELOPMENT = __DEV__;

// API
// export const API_URL = __DEV__ ? 'http://10.0.2.2:4000' : 'http://75.119.154.167:4000';
export const API_URL = __DEV__ ? 'http://75.119.154.167:4000' : 'http://75.119.154.167:4000';
export const API_TIMEOUT = 60 * 1000;
export const IMAGE_URL = API_URL + '/api/image/store/';
export const WS_URL = API_URL + '/ws/';

// AUTHORIZATION
export const AUTHORIZATION_HEADER = 'authorization';
export const AUTHORIZATION_PREFIX = 'Bearer ';

// CAPTCHA
export const BASE_URL = 'http://75.119.154.167';
***REMOVED***

// HEADER
export const HEADER_HEIGHT = 55;
export const MAX_REFRESH_HEIGHT = 100;

// AVATARS
export const AVATARS_IN_CARD = 3;

// GROUPS
export const CARD_ITEMS_COUNT = 5;
export const GROUP_ITEMS_COUNT = 20;

// IMAGES
export const IMAGE_SIZE = 500;

// FORMS
export const INPUT_FONT_SIZE = 13;

// SPACES
export const DEFAULT_SPACE = 3;
export const HALF_DEFAULT_SPACE = 1.5;
export const SMALL_SPACE = 1;

// CHATS
export const TIMEOUT_BEFORE_MARK_AS_READ = 1000;

// BUILDERS
export const ID_STUB = 'ID_STUB';
