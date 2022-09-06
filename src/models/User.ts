export const genders = ['MALE', 'FEMALE', 'DIVERSE'];

type Gender = 'MALE' | 'FEMALE' | 'DIVERSE';
type Language = 'en' | 'ru';

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
}
