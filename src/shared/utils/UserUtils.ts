import {TFunction} from 'i18next';
import {User} from '../../models/User';

export class UserUtils {
  public static getUsername = (user: User, t: TFunction): string => {
    return user?.deleted ? t('common:links.userDeleted') : user?.username;
  };
}
