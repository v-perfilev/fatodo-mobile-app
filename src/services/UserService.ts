import {AxiosPromise} from 'axios';
import {ChangePasswordDTO} from '../models/dto/ChangePasswordDTO';
import {User, UserAccount} from '../models/User';
import axios from '../shared/axios';
import {ChangeLanguageDTO} from '../models/dto/ChangeLanguageDTO';

export default class UserService {
  private static baseUrl = '/api/user';

  public static getAllByIds = (ids: string[]): AxiosPromise<User[]> => {
    const url = UserService.baseUrl + '/user-data/summary';
    const params = {ids};
    return axios.get(url, {params});
  };

  public static getAllByUsernamePart = (usernamePart: string): AxiosPromise<User[]> => {
    const url = UserService.baseUrl + '/user-data/summary/' + usernamePart + '/username-part';
    return axios.get(url);
  };

  public static getByUsername = (username: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user-data/summary/' + username + '/username';
    return axios.get(url);
  };

  public static getByUsernameOrEmail = (user: string): AxiosPromise<User> => {
    const url = UserService.baseUrl + '/user-data/summary/' + user + '/username-or-email';
    return axios.get(url);
  };

  public static getCurrent = (): AxiosPromise<UserAccount> => {
    const url = UserService.baseUrl + '/account';
    return axios.get(url);
  };

  public static updateAccount = (formData: FormData): AxiosPromise<void> => {
    const url = UserService.baseUrl + '/account';
    const config = {headers: {'content-type': 'multipart/form-data'}};
    return axios.put(url, formData, config);
  };

  public static changePassword = (dto: ChangePasswordDTO): AxiosPromise<void> => {
    const url = UserService.baseUrl + '/account/password';
    return axios.put(url, dto);
  };

  public static changeLanguage = (dto: ChangeLanguageDTO): AxiosPromise<void> => {
    const url = UserService.baseUrl + '/account/language';
    return axios.put(url, dto);
  };

  public static doesEmailExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/email/' + value;
    return axios.get(url);
  };

  public static doesUsernameExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/username/' + value;
    return axios.get(url);
  };

  public static doesUsernameOrEmailExist = (value: string): AxiosPromise<boolean> => {
    const url = UserService.baseUrl + '/check/username-or-email/' + value;
    return axios.get(url);
  };
}
