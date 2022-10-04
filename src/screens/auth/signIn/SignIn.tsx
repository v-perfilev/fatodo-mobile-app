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
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import ColorModeSwitch from '../../../components/controls/ColorModeSwitch';

const SignIn = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <SimpleScrollView>
      <FCenter grow pt="10">
        <FVStack space="5" w="90%" maxW="300px">
          <FCenter grow>
            <Logo withText />
          </FCenter>
          <SignInForm />
          <FVStack smallSpace>
            <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
            <LinkButton onPress={goToSignUp}>{t('account:register.header')}</LinkButton>
          </FVStack>
        </FVStack>
      </FCenter>
      <FVStack space="5" pb="5">
        <LanguageMenu />
        <ColorModeSwitch />
      </FVStack>
    </SimpleScrollView>
  );
};

export default SignIn;
