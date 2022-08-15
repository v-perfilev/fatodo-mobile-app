import React from 'react';
import SignInForm from './SignInForm';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FCenter from '../../../components/boxes/FCenter';
import FVStack from '../../../components/boxes/FVStack';
import {ScrollView} from 'native-base';
import {DEFAULT_SPACE} from '../../../constants';

const SignIn = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <ScrollView p={DEFAULT_SPACE} keyboardShouldPersistTaps="handled">
      <FCenter grow pt="10" pb="5">
        <FVStack w="90%" maxW="300px" defaultSpace>
          <FCenter grow>
            <Logo withText centerText />
          </FCenter>
          <SignInForm />
          <FVStack smallSpace>
            <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
            <LinkButton onPress={goToSignUp}>{t('account:register.header')}</LinkButton>
          </FVStack>
        </FVStack>
      </FCenter>
      <FCenter pt="5" pb="10">
        <LanguageMenu />
      </FCenter>
    </ScrollView>
  );
};

export default SignIn;
