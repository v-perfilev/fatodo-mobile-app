import {login, requestAccountData} from '../../store/actions/AuthActions';
import {connect, ConnectedProps} from 'react-redux';
import {FormikBag, FormikProps, withFormik} from 'formik';
import React, {FC, useEffect} from 'react';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import AuthService from '../../services/AuthService';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../shared/hocs/withCaptcha';
import {LoginDTO} from '../../models/dto/LoginDTO';
import {VStack} from 'native-base';
import FormikTextInput from '../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../components/inputs/FormikPasswordInput';
import {useTranslation} from 'react-i18next';
import LoadableButton from '../../components/controls/LoadableButton';
import {withSnackContext} from '../../shared/hocs/withSnackbar';
import {SnackState} from '../../shared/contexts/SnackContext';
import {AxiosError} from 'axios';

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

type SignInFormProps = FormikProps<SignInFormValues> & SnackState & CaptchaProps & ConnectedProps<typeof connector>;

const SignInForm: FC<SignInFormProps> = (props) => {
  const {isValid, handleSubmit, isSubmitting, setSubmitting, captchaToken, requestCaptchaToken} = props;
  const {t} = useTranslation();

  const submit = (): void => {
    setSubmitting(true);
    requestCaptchaToken();
  };

  useEffect(() => {
    if (captchaToken === 'error' && isSubmitting) {
      setSubmitting(false);
    } else if (captchaToken && isSubmitting) {
      handleSubmit();
    }
  }, [captchaToken, handleSubmit, isSubmitting, setSubmitting]);

  return (
    <VStack w="100%" space="3" mt="7">
      <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={isSubmitting} {...props} />
      <FormikPasswordInput
        name="password"
        label={t('account:fields.password.label')}
        isDisabled={isSubmitting}
        {...props}
      />
      <LoadableButton
        colorScheme="secondary"
        mt="5"
        size="lg"
        text={t('account:login.submit')}
        loading={isSubmitting}
        isDisabled={!isValid || isSubmitting}
        onPress={submit}
      />
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

  handleSubmit: async (
    values: SignInFormValues,
    {setSubmitting, props}: FormikBag<SignInFormProps, SignInFormValues>,
  ) => {
    const {login, requestAccountData, captchaToken, handleResponse} = props;

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
      .catch(({response}: AxiosError) => {
        handleResponse(response!);
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, withCaptcha, connector, formik])(SignInForm);
