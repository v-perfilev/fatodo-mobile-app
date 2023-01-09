import React from 'react';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProps} from '../../../navigators/AuthNavigator';
import ForgotPasswordForm from './ForgotPasswordForm';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FCenter from '../../../components/boxes/FCenter';
import FVStack from '../../../components/boxes/FVStack';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import ColorModeSwitch from '../../../components/controls/ColorModeSwitch';

const ForgotPassword = () => {
  const navigation = useNavigation<AuthNavigationProps>();
  const {t} = useTranslation();

  const goToSignIn = (): void => navigation.navigate('SignIn');

  return (
    <SimpleScrollView>
      <FCenter grow pt="10" pb="5">
        <FVStack space="5" w="90%" maxW="300">
          <FCenter grow>
            <Logo withText />
          </FCenter>
          <ForgotPasswordForm onSuccess={goToSignIn} />
          <FVStack space="2">
            <LinkButton onPress={goToSignIn}>{t('account:login.header')}</LinkButton>
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

export default ForgotPassword;
