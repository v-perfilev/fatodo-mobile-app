import i18n from '../i18n';
import {UserAccount} from '../../models/User';
import {DateUtils} from './DateUtils';

export class LanguageUtils {
  public static getLanguage = (): string => i18n.language;

  public static setLanguage = (code: string): void => {
    i18n.changeLanguage(code).finally();
  };

  public static setLanguageFromUser = (account: UserAccount): void => {
    const code = account?.info?.language;
    if (code) {
      DateUtils.resetLocale(code);
      LanguageUtils.setLanguage(code);
    }
  };
}
