import React, {FC, useState} from 'react';
import SignInForm from './SignInForm';
import Logo from '../../components/layouts/Logo';
import {Center, Stack} from 'native-base';
import LinkButton from '../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../navigators/AuthNavigator';

const SignIn: FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <Center safeArea py="5" mx="auto" w="90%" maxW="300" minH="100%">
      <Logo withText centerText />
      <SignInForm {...{isLoading, setLoading}} />
      <Stack mt="5" space="2">
        <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
        <LinkButton onPress={goToSignUp}>{t('account:register.header')}</LinkButton>
      </Stack>
    </Center>
  );
};

export default SignIn;
