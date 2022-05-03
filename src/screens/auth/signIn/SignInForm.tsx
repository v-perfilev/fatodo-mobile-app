import {login, requestAccountData} from '../../../store/actions/AuthActions';
import {connect, ConnectedProps} from 'react-redux';
import {FormikBag, FormikProps, withFormik} from 'formik';
import React, {useEffect, useState} from 'react';
import {SecurityUtils} from '../../../shared/utils/SecurityUtils';
import AuthService from '../../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import {LoginDTO} from '../../../models/dto/LoginDTO';
import {VStack} from 'native-base';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {useTranslation} from 'react-i18next';
import {withSnackContext} from '../../../shared/hocs/withSnackbar';
import {SnackState} from '../../../shared/contexts/SnackContext';
import SolidButton from '../../../components/controls/SolidButton';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

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

type SignInFormProps = FormikProps<SignInFormValues> &
  SnackState &
  CaptchaProps &
  ConnectedProps<typeof connector> & {
    isLoading: boolean;
    setLoading: (isLoading: boolean) => void;
  };

const SignInForm = (props: SignInFormProps) => {
  const {isValid, handleSubmit, isLoading, setLoading, captchaToken, requestCaptchaToken} = props;
  const {t} = useTranslation();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const submit = (): void => {
    setLoading(true);
    requestCaptchaToken();
  };

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (captchaToken === 'error' && isLoading) {
      setLoading(false);
    } else if (captchaToken && isLoading) {
      handleSubmit();
    }
  }, [captchaToken, isLoading]);

  return (
    <VStack w="100%" space="3" mt="7">
      <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={isLoading} {...props} />
      <FormikPasswordInput
        name="password"
        label={t('account:fields.password.label')}
        isDisabled={isLoading}
        {...props}
      />
      <SolidButton
        colorScheme="secondary"
        mt="5"
        size="lg"
        isLoading={isLoading}
        isDisabled={!isInitialized || !isValid || isLoading}
        onPress={submit}
      >
        {t('account:login.submit')}
      </SolidButton>
    </VStack>
  );
};

const formik = withFormik<SignInFormProps, SignInFormValues>({
  mapPropsToValues: (): SignInFormValues => defaultSignInFormValues,
  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required')),
    password: Yup.string().required(() => i18n.t('account:fields.password.required')),
  }),
  validateOnMount: true,

  handleSubmit: async (values: SignInFormValues, {props}: FormikBag<SignInFormProps, SignInFormValues>) => {
    const {login, requestAccountData, captchaToken, handleResponse, setLoading} = props;

    const dto = {
      user: values.user.trim(),
      password: values.password.trim(),
      token: captchaToken,
    } as LoginDTO;

    AuthService.authenticate(dto)
      .then((response) => {
        const token = SecurityUtils.parseTokenFromResponse(response);
        login(dto.user, token);
        requestAccountData();
      })
      .catch(({response}) => {
        handleResponse(response);
        setLoading(false);
      });
  },
});

export default flowRight([withSnackContext, withCaptcha, connector, formik])(SignInForm);
