import * as Yup from 'yup';
import UserService from '../services/UserService';
import i18n from './i18n';
import {AsyncValidator} from './utils/YupUtils';

export const usernameRegex = /^[A-Za-z\d]+$/;
export const passwordRegex = /^[A-Za-z\d]+$/;
export const passwordStrengthMap = ['(?=.*[A-Z])', '(?=.*[a-z])', '(?=.*\\d)'];
export const passwordStrengthPrefix = '^(';
export const passwordStrengthPostfix = '.*)$';
export const passwordStrengthRegex = new RegExp(
  passwordStrengthPrefix + passwordStrengthMap.reduce((acc, val) => acc + val) + passwordStrengthPostfix,
);

export const emailValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('account:fields.email.required'))
    .email(() => i18n.t('account:fields.email.notValid')),
  {
    name: 'unique',
    message: (): string => i18n.t('account:fields.email.notUnique'),
    test: async (value: string): Promise<boolean> => !(await UserService.doesEmailExist(value)).data,
  },
);

export const passwordValidator = Yup.string()
  .required(() => i18n.t('account:fields.password.required'))
  .matches(passwordRegex, {message: () => i18n.t('account:fields.password.invalid')})
  .matches(passwordStrengthRegex, {message: () => i18n.t('account:fields.password.strength')})
  .min(8, () => i18n.t('account:fields.password.min8'))
  .max(20, () => i18n.t('account:fields.password.max20'));

export const usernameValidator = new AsyncValidator(
  Yup.string()
    .required(() => i18n.t('account:fields.username.required'))
    .matches(usernameRegex, {message: () => i18n.t('account:fields.username.invalid')})
    .min(5, () => i18n.t('account:fields.username.min5'))
    .max(20, () => i18n.t('account:fields.username.max20')),
  {
    name: 'unique',
    message: (): string => i18n.t('account:fields.username.notUnique'),
    test: async (value: string): Promise<boolean> => !(await UserService.doesUsernameExist(value)).data,
  },
);

export const userValidator = (currentLogin: string, currentEmail: string): AsyncValidator =>
  new AsyncValidator(
    Yup.string()
      .required(() => i18n.t('contact:addContact.fields.user.required'))
      .matches(new RegExp('^(?!' + currentLogin + '$).*$'), {
        message: () => i18n.t('contact:addContact.fields.user.current'),
      })
      .matches(new RegExp('^(?!' + currentEmail + '$).*$'), {
        message: () => i18n.t('contact:addContact.fields.user.current'),
      }),
    {
      name: 'exists',
      message: (): string => i18n.t('contact:addContact.fields.user.notRegistered'),
      test: async (value): Promise<boolean> => (await UserService.doesUsernameOrEmailExist(value)).data === true,
    },
  );

export const usernameChangeValidator = (currentLogin: string): AsyncValidator =>
  new AsyncValidator(
    Yup.string()
      .required(() => i18n.t('account:fields.username.required'))
      .matches(usernameRegex, {message: () => i18n.t('account:fields.username.invalid')})
      .min(5, () => i18n.t('account:fields.username.min5'))
      .max(20, () => i18n.t('account:fields.username.max20')),
    {
      name: 'unique',
      message: (): string => i18n.t('account:fields.username.notUnique'),
      test: async (value): Promise<boolean> =>
        value === currentLogin || (await UserService.doesUsernameExist(value)).data === false,
    },
  );
