import React from 'react';
import SignInForm from './SignInForm';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FScrollView from '../../../components/surfaces/FScrollView';
import FCenter from '../../../components/surfaces/FCenter';
import FVStack from '../../../components/surfaces/FVStack';

const SignIn = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <FScrollView keyboardShouldPersistTaps="handled">
      <FCenter grow pt="10" pb="5">
        <FVStack w="90%" maxW="300px" defaultSpace>
          <FCenter grow>
            <Logo withText centerText />
          </FCenter>
          <SignInForm />
          <FVStack space="1">
            <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
            <LinkButton onPress={goToSignUp}>{t('account:register.header')}</LinkButton>
          </FVStack>
        </FVStack>
      </FCenter>
      <FCenter pt="5" pb="10">
        <LanguageMenu />
      </FCenter>
    </FScrollView>
  );
};

export default SignIn;
