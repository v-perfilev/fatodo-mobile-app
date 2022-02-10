import {login, requestAccountData} from '../../store/actions/AuthActaions';
import {connect, ConnectedProps} from 'react-redux';
import {FormikBag, FormikProps, withFormik} from 'formik';
import React, {FC} from 'react';
import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import AuthService from '../../services/AuthService';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../shared/i18n';

const logoImg = require('../../../assets/images/logo.png');

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type SignInFormValues = {
  user: string;
  password: string;
};

const defaultSignInFormValues: Readonly<SignInFormValues> = {
  user: '',
  password: '',
};

type SignInFormProps = FormikProps<SignInFormValues> &
  ConnectedProps<typeof connector> & {
    loading: boolean;
    setLoading: (loading: boolean) => void;
  };

const SignInForm: FC<SignInFormProps> = ({values, isValid, handleChange, handleBlur, handleSubmit}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logoImg} />
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="User"
          placeholderTextColor="#003f5c"
          onChangeText={handleChange('user')}
          onBlur={handleBlur('user')}
          value={values.user}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          onChangeText={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
        />
      </View>
      <TouchableOpacity style={styles.forgotBtn}>
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginBtn} disabled={!isValid} onPress={handleSubmit}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#FFC0CB',
    borderRadius: 30,
    width: '70%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  forgotBtn: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: '#FF1493',
  },
});

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
    const {login, requestAccountData, setLoading} = props;

    const dto = {
      user: values.user.trim(),
      password: values.password.trim(),
    };

    setLoading(true);
    AuthService.authenticate(dto)
      .then((response) => {
        const token = SecurityUtils.parseTokenFromResponse(response);
        login(dto.user, token);
        requestAccountData();
      })
      .catch(() => {
        setSubmitting(false);
        setLoading(false);
      });
  },
});

export default flowRight([connector, formik])(SignInForm);
