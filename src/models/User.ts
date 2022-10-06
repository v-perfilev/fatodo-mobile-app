export const genders: Gender[] = ['MALE', 'FEMALE', 'DIVERSE'];
export const timeFormats: TimeFormat[] = ['H12', 'H24'];
export const dateFormats: DateFormat[] = ['YMD_DASH', 'MDY_SLASH', 'DMY_DASH', 'DMY_DOT', 'DMY_SLASH'];

export type Gender = 'MALE' | 'FEMALE' | 'DIVERSE';
export type Language = 'EN' | 'RU';
export type TimeFormat = 'H12' | 'H24';
export type DateFormat = 'YMD_DASH' | 'MDY_SLASH' | 'DMY_DASH' | 'DMY_DOT' | 'DMY_SLASH';

export interface UserAccount {
  id: string;
  username: string;
  email: string;
  provider: string;
  authorities: string[];
  info: UserInfo;
}

export interface User {
  id: string;
  username: string;
  firstname?: string;
  lastname?: string;
  gender?: Gender;
  imageFilename?: string;
}

export interface UserInfo {
  firstname?: string;
  lastname?: string;
  imageFilename?: string;
  gender?: Gender;
  language: Language;
  timezone: string;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
}

export const accountToUser = (account: UserAccount): User => ({
  id: account.id,
  username: account.username,
  firstname: account.info.firstname,
  lastname: account.info.lastname,
  gender: account.info.gender,
  imageFilename: account.info.imageFilename,
});
