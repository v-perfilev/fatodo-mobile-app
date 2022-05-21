import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import AuthService from '../../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {useTranslation} from 'react-i18next';
import {emailValidator, passwordValidator, usernameValidator} from '../forgotPassword/ForgotPasswordValidators';
import {RegistrationDTO} from '../../../models/dto/RegistrationDTO';
import i18n from '../../../shared/i18n';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {PasswordStrengthBar} from '../../../components/inputs/PasswordStrengthBar';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/surfaces/FVStack';
import {useAppDispatch} from '../../../store/hooks';
import SnackActions from '../../../store/snack/snackActions';

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

const validationSchema = Yup.object().shape({
  email: emailValidator.check(),
  username: usernameValidator.check(),
  password: passwordValidator,
});

type SignUpFormProps = CaptchaProps & {
  onSuccess?: () => void;
};

const SignUpForm = ({captchaToken, requestCaptchaToken, onSuccess}: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignUpFormValues>();

  const handleClickOnSubmit = (values: SignUpFormValues): void => {
    setFormValues(values);
    setLoading(true);
    requestCaptchaToken();
  };

  const handleSubmit = (): void => {
    const language = i18n.language;
    const timezone = DateUtils.getTimezone();

    const dto = {
      email: formValues.email.trim(),
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      language,
      timezone,
      token: captchaToken,
    } as RegistrationDTO;

    AuthService.register(dto)
      .then(() => {
        dispatch(SnackActions.handleCode('auth.registered', 'info'));
        if (onSuccess) {
          onSuccess();
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (captchaToken === 'error' && loading) {
      setLoading(false);
    } else if (captchaToken && loading) {
      handleSubmit();
    }
  }, [captchaToken, loading, formValues]);

  return (
    <Formik
      initialValues={defaultSignUpFormValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleClickOnSubmit}
    >
      {(formikProps) => (
        <FVStack w="100%" defaultSpace>
          <FormikTextInput name="email" label={t('account:fields.email.label')} isDisabled={loading} {...formikProps} />
          <FormikTextInput
            name="username"
            label={t('account:fields.username.label')}
            isDisabled={loading}
            {...formikProps}
          />
          <FormikPasswordInput
            name="password"
            label={t('account:fields.password.label')}
            isDisabled={loading}
            {...formikProps}
          />
          <PasswordStrengthBar password={formikProps.values.password} />
          <SolidButton
            colorScheme="secondary"
            size="lg"
            isLoading={loading}
            isDisabled={!formikProps.isValid || loading}
            onPress={formikProps.submitForm}
          >
            {t('account:register.submit')}
          </SolidButton>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withCaptcha])(SignUpForm);
