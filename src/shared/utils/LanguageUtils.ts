import i18n from '../i18n';
import {UserAccount} from '../../models/User';
import {DateUtils} from './DateUtils';

export class LanguageUtils {
  public static getFallbackLanguage = (): string =>
    Array.isArray(i18n.options.fallbackLng) ? i18n.options.fallbackLng[0] : String(i18n.options.fallbackLng);

  // @ts-ignore
  public static getLanguages = (): string[] => i18n.languages;

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
