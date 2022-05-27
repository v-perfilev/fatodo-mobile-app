import React from 'react';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import ForgotPasswordForm from './ForgotPasswordForm';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FScrollView from '../../../components/surfaces/FScrollView';
import FCenter from '../../../components/surfaces/FCenter';
import FVStack from '../../../components/surfaces/FVStack';

const ForgotPassword = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToSignIn = (): void => navigation.navigate('SignIn');

  return (
    <FScrollView keyboardShouldPersistTaps="handled">
      <FCenter grow pt="10" pb="5">
        <FVStack space="5" w="90%" maxW="300">
          <FCenter grow>
            <Logo withText centerText />
          </FCenter>
          <ForgotPasswordForm onSuccess={goToSignIn} />
          <FVStack smallSpace>
            <LinkButton onPress={goToSignIn}>{t('account:login.header')}</LinkButton>
          </FVStack>
        </FVStack>
      </FCenter>
      <FCenter pt="5" pb="10">
        <LanguageMenu />
      </FCenter>
    </FScrollView>
  );
};

export default ForgotPassword;
