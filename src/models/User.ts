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
  imageFilename?: string;
}

export interface UserInfo {
  firstname?: string;
  lastname?: string;
  imageFilename?: string;
  language: string;
  timezone: string;
}

export const convertAccountToUser = (account: UserAccount): User => {
  return {
    id: account?.username,
    username: account?.username,
    firstname: account?.info?.firstname,
    lastname: account?.info?.lastname,
    imageFilename: account?.info?.imageFilename,
  };
};
