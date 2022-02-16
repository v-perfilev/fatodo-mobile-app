import {AUTHORIZATION_HEADER, AUTHORIZATION_PREFIX} from '../../constants';
import * as Keychain from 'react-native-keychain';
import {AxiosResponse} from 'axios';

export class SecurityUtils {
  public static clearAuthToken = async (): Promise<void> => {
    await Keychain.resetGenericPassword();
  };

  public static saveAuthToken = async (username: string, token: string): Promise<void> => {
    await Keychain.setGenericPassword(username, token);
  };

  public static getAuthToken = async (): Promise<string> => {
    const credentials = await Keychain.getGenericPassword();
    return credentials ? credentials.password : null;
  };

  public static parseTokenFromResponse = (response: AxiosResponse): string => {
    const token = response?.headers?.[AUTHORIZATION_HEADER];
    const prefixLength = AUTHORIZATION_PREFIX.length;
    return token && token.slice(0, prefixLength) === AUTHORIZATION_PREFIX
      ? token.slice(prefixLength, token.length)
      : '';
  };
}
