import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import AuthService from '../../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {SnackState, useSnackContext} from '../../../shared/contexts/SnackContext';
import {ForgotPasswordDTO} from '../../../models/dto/ForgotPasswordDTO';
import SolidButton from '../../../components/controls/SolidButton';
import withSnackContext from '../../../shared/hocs/withSnack/withSnackContext';
import FVStack from '../../../components/surfaces/FVStack';

export interface ForgotPasswordFormValues {
  user: string;
}

const defaultForgotPasswordFormValues: Readonly<ForgotPasswordFormValues> = {
  user: '',
};

const validationSchema = Yup.object().shape({
  user: Yup.string().required(() => i18n.t('account:fields.user.required')),
});

type ForgotPasswordFormProps = SnackState &
  CaptchaProps & {
    onSuccess?: () => void;
  };

const ForgotPasswordForm = ({captchaToken, requestCaptchaToken, onSuccess}: ForgotPasswordFormProps) => {
  const {t} = useTranslation();
  const {handleResponse, handleCode} = useSnackContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>();

  const handleClickOnSubmit = (values: ForgotPasswordFormValues): void => {
    setFormValues(values);
    setLoading(true);
    requestCaptchaToken();
  };

  const handleSubmit = (): void => {
    const dto = {
      user: formValues.user.trim(),
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
      initialValues={defaultForgotPasswordFormValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleClickOnSubmit}
    >
      {(formikProps) => (
        <FVStack w="100%">
          <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={loading} {...formikProps} />
          <SolidButton
            colorScheme="secondary"
            mt="5"
            size="lg"
            isLoading={loading}
            isDisabled={!formikProps.isValid || loading}
            onPress={formikProps.submitForm}
          >
            {t('account:forgotPassword.submit')}
          </SolidButton>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withSnackContext, withCaptcha])(ForgotPasswordForm);
