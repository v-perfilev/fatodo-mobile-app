import React from 'react';
import SignInForm from './SignInForm';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigators/AuthNavigator';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FCenter from '../../../components/boxes/FCenter';
import FVStack from '../../../components/boxes/FVStack';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import ColorModeSwitch from '../../../components/controls/ColorModeSwitch';
import SocialButtons from './SocialButtons';

const SignIn = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {t} = useTranslation();

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  return (
    <SimpleScrollView position="relative">
      <FCenter grow pt="10" pb="5">
        <FVStack space="5" w="90%" maxW="300px">
          <FCenter grow>
            <Logo withText />
          </FCenter>
          <SignInForm />
          <FVStack space="2">
            <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
            <LinkButton onPress={goToSignUp} _text={{fontWeight: 'bold'}}>
              {t('account:register.header')}
            </LinkButton>
          </FVStack>
          <SocialButtons />
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
