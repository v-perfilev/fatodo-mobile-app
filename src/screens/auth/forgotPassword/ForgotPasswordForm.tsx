import {FormikBag, FormikProps, withFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import AuthService from '../../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import {VStack} from 'native-base';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {withSnackContext} from '../../../shared/hocs/withSnackbar';
import {SnackState} from '../../../shared/contexts/SnackContext';
import {ForgotPasswordDTO} from '../../../models/dto/ForgotPasswordDTO';
import SolidButton from '../../../components/controls/SolidButton';

export interface ForgotPasswordFormValues {
  user: string;
}

const defaultForgotPasswordFormValues: Readonly<ForgotPasswordFormValues> = {
  user: '',
};

type ForgotPasswordFormProps = FormikProps<ForgotPasswordFormValues> &
  SnackState &
  CaptchaProps & {
    onSuccess?: () => void;
  };

const ForgotPasswordForm = (props: ForgotPasswordFormProps) => {
  const {isValid, handleSubmit, isSubmitting, setSubmitting, captchaToken, requestCaptchaToken} = props;
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
      <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={isSubmitting} {...props} />
      <SolidButton
        colorScheme="secondary"
        mt="5"
        size="lg"
        isLoading={isSubmitting}
        isDisabled={!isInitialized || !isValid || isSubmitting}
        onPress={submit}
      >
        {t('account:forgotPassword.submit')}
      </SolidButton>
    </VStack>
  );
};

const formik = withFormik<ForgotPasswordFormProps, ForgotPasswordFormValues>({
  mapPropsToValues: (): ForgotPasswordFormValues => defaultForgotPasswordFormValues,
  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required')),
  }),
  validateOnMount: true,

  handleSubmit: async (
    values: ForgotPasswordFormValues,
    {setSubmitting, props}: FormikBag<ForgotPasswordFormProps, ForgotPasswordFormValues>,
  ) => {
    const {captchaToken, handleCode, handleResponse, onSuccess} = props;

    const dto = {
      user: values.user.trim(),
      token: captchaToken,
    } as ForgotPasswordDTO;

    AuthService.requestResetPasswordCode(dto)
      .then(() => {
        handleCode('auth.afterForgotPassword', 'info');
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

export default flowRight([withSnackContext, withCaptcha, formik])(ForgotPasswordForm);
