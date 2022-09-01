import React, {memo} from 'react';
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

const SignIn = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <SimpleScrollView>
      <FCenter grow pt="10" pb="5">
        <FVStack space="5" w="90%" maxW="300px">
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
    </SimpleScrollView>
  );
};

export default memo(SignIn);
