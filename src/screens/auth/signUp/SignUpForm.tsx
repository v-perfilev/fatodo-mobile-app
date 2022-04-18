import {FormikBag, FormikProps, withFormik} from 'formik';
import React, {FC, useEffect, useState} from 'react';
import AuthService from '../../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import {VStack} from 'native-base';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {useTranslation} from 'react-i18next';
import {withSnackContext} from '../../../shared/hocs/withSnackbar';
import {SnackState} from '../../../shared/contexts/SnackContext';
import {emailValidator, passwordValidator, usernameValidator} from '../forgotPassword/ForgotPasswordValidators';
import {RegistrationDTO} from '../../../models/dto/RegistrationDTO';
import i18n from '../../../shared/i18n';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {PasswordStrengthBar} from '../../../components/inputs/PasswordStrengthBar';
import SolidButton from '../../../components/controls/SolidButton';

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

const defaultSignUpFormValues: Readonly<SignUpFormValues> = {
  email: '',
  username: '',
  password: '',
};

type SignUpFormProps = FormikProps<SignUpFormValues> &
  SnackState &
  CaptchaProps & {
    onSuccess?: () => void;
  };
const SignUpForm: FC<SignUpFormProps> = (props) => {
  const {isValid, handleSubmit, isSubmitting, setSubmitting, captchaToken, requestCaptchaToken, values} = props;
  const {t} = useTranslation();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const submit = (): void => {
    setSubmitting(true);
    requestCaptchaToken();
  };

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (captchaToken === 'error' && isSubmitting) {
      setSubmitting(false);
    } else if (captchaToken && isSubmitting) {
      handleSubmit();
    }
  }, [captchaToken, isSubmitting]);

  return (
    <VStack w="100%" space="3" mt="7">
      <FormikTextInput name="email" label={t('account:fields.email.label')} isDisabled={isSubmitting} {...props} />
      <FormikTextInput
        name="username"
        label={t('account:fields.username.label')}
        isDisabled={isSubmitting}
        {...props}
      />
      <FormikPasswordInput
        name="password"
        label={t('account:fields.password.label')}
        isDisabled={isSubmitting}
        {...props}
      />
      <PasswordStrengthBar password={values.password} />
      <SolidButton
        colorScheme="secondary"
        mt="5"
        size="lg"
        isLoading={isSubmitting}
        isDisabled={!isInitialized || !isValid || isSubmitting}
        onPress={submit}
      >
        {t('account:register.submit')}
      </SolidButton>
    </VStack>
  );
};

const formik = withFormik<SignUpFormProps, SignUpFormValues>({
  mapPropsToValues: (): SignUpFormValues => defaultSignUpFormValues,
  validationSchema: Yup.object().shape({
    email: emailValidator.check(),
    username: usernameValidator.check(),
    password: passwordValidator,
  }),
  validateOnMount: true,

  handleSubmit: async (
    values: SignUpFormValues,
    {setSubmitting, props}: FormikBag<SignUpFormProps, SignUpFormValues>,
  ) => {
    const {captchaToken, handleCode, handleResponse, onSuccess} = props;

    const language = i18n.language;
    const timezone = DateUtils.getTimezone();

    const dto = {
      email: values.email.trim(),
      username: values.username.trim(),
      password: values.password.trim(),
      language,
      timezone,
      token: captchaToken,
    } as RegistrationDTO;

    AuthService.register(dto)
      .then(() => {
        handleCode('auth.registered', 'info');
        if (onSuccess) {
          onSuccess();
        }
      })
      .catch(({response}) => {
        handleResponse(response);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, withCaptcha, formik])(SignUpForm);
