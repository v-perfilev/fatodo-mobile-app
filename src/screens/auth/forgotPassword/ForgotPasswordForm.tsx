import {Formik} from 'formik';
import React, {useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {ForgotPasswordDTO} from '../../../models/dto/ForgotPasswordDTO';
import SolidButton from '../../../components/controls/SolidButton';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import AuthActions from '../../../store/auth/authActions';
import AuthThunks from '../../../store/auth/authThunks';

export interface ForgotPasswordFormValues {
  user: string;
}

const defaultForgotPasswordFormValues: Readonly<ForgotPasswordFormValues> = {
  user: '',
};

const validationSchema = Yup.object().shape({
  user: Yup.string().required(() => i18n.t('account:fields.user.required')),
});

type ForgotPasswordFormProps = CaptchaProps & {
  onSuccess: () => void;
};

const ForgotPasswordForm = ({captchaToken, requestCaptchaToken, onSuccess}: ForgotPasswordFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();
  const [formValues, setFormValues] = useState<ForgotPasswordFormValues>();

  const handleClickOnSubmit = (values: ForgotPasswordFormValues): void => {
    setFormValues(values);
    dispatch(AuthActions.loading(true));
    requestCaptchaToken();
  };

  const handleSubmit = (): void => {
    const dto = {
      user: formValues.user.trim(),
      token: captchaToken,
    } as ForgotPasswordDTO;

    dispatch(AuthThunks.forgotPassword(dto))
      .unwrap()
      .then(() => onSuccess());
  };

  useEffect(() => {
    if (captchaToken === 'error' && loading) {
      dispatch(AuthActions.loading(false));
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

export default flowRight([withCaptcha])(ForgotPasswordForm);
