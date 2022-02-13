import * as Yup from 'yup';
import UserService from '../../services/UserService';
import i18n from '../../shared/i18n';
import {AsyncValidator} from '../../shared/utils/YupUtils';

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
