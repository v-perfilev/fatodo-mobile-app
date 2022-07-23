import {AxiosPromise} from 'axios';
import {LoginDTO} from '../models/dto/LoginDTO';
import {RegistrationDTO} from '../models/dto/RegistrationDTO';
import {ForgotPasswordDTO} from '../models/dto/ForgotPasswordDTO';
import axios from '../shared/axios';

export default class AuthService {
  private static baseUrl = '/api/auth';

  public static authenticate = (dto: LoginDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/authenticate';
    return axios.post(url, dto);
  };

  public static register = (dto: RegistrationDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/register';
    return axios.post(url, dto);
  };

  public static requestResetPasswordCode = (dto: ForgotPasswordDTO): AxiosPromise<void> => {
    const url = AuthService.baseUrl + '/account/request-reset-password-code';
    return axios.post(url, dto);
  };
}
