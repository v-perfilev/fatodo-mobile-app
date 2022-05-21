import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {useTranslation} from 'react-i18next';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/surfaces/FVStack';
import {useAppDispatch} from '../../../store/hooks';
import {LoginDTO} from '../../../models/dto/LoginDTO';
import AuthService from '../../../services/AuthService';
import {SecurityUtils} from '../../../shared/utils/SecurityUtils';
import AuthActions from '../../../store/auth/authActions';

type SignInFormValues = {
  user: string;
  password: string;
  token: string;
};

const defaultSignInFormValues: Readonly<SignInFormValues> = {
  user: '',
  password: '',
  token: '',
};

const signInValidationScheme = Yup.object().shape({
  user: Yup.string().required(() => i18n.t('account:fields.user.required')),
  password: Yup.string().required(() => i18n.t('account:fields.password.required')),
});

type SignInFormProps = CaptchaProps;

const SignInForm = ({captchaToken, requestCaptchaToken}: SignInFormProps) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<SignInFormValues>();

  const handleClickOnSubmit = (values: SignInFormValues): void => {
    setFormValues(values);
    setLoading(true);
    requestCaptchaToken();
  };

  const handleSubmit = (): void => {
    const dto = {
      user: formValues.user.trim(),
      password: formValues.password.trim(),
      token: captchaToken,
    } as LoginDTO;

    AuthService.authenticate(dto)
      .then((response) => {
        const token = SecurityUtils.parseTokenFromResponse(response);
        dispatch(AuthActions.login(dto.user, token));
        dispatch(AuthActions.requestAccountData());
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (captchaToken === 'error' && loading) {
      setLoading(false);
    } else if (captchaToken && formValues && loading) {
      handleSubmit();
    }
  }, [captchaToken, loading, formValues]);

  return (
    <Formik
      initialValues={defaultSignInFormValues}
      validationSchema={signInValidationScheme}
      validateOnMount
      onSubmit={handleClickOnSubmit}
    >
      {(formikProps) => (
        <FVStack w="100%" defaultSpace>
          <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={loading} {...formikProps} />
          <FormikPasswordInput
            name="password"
            label={t('account:fields.password.label')}
            isDisabled={loading}
            {...formikProps}
          />
          <SolidButton
            colorScheme="secondary"
            size="lg"
            isLoading={loading}
            isDisabled={!formikProps.isValid || loading}
            onPress={formikProps.submitForm}
          >
            {t('account:login.submit')}
          </SolidButton>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withCaptcha])(SignInForm);
