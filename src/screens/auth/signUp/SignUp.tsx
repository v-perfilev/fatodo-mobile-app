import React from 'react';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import SignUpForm from './SignUpForm';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FCenter from '../../../components/boxes/FCenter';
import FVStack from '../../../components/boxes/FVStack';
import {ScrollView} from 'native-base';
import {DEFAULT_SPACE} from '../../../constants';

const SignUp = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToSignIn = (): void => navigation.navigate('SignIn');

  return (
    <ScrollView p={DEFAULT_SPACE} keyboardShouldPersistTaps="handled">
      <FCenter grow pt="10" pb="5">
        <FVStack w="90%" maxW="300px" defaultSpace>
          <FCenter grow>
            <Logo withText centerText />
          </FCenter>
          <SignUpForm onSuccess={goToSignIn} />
          <FVStack smallSpace>
            <LinkButton onPress={goToSignIn}>{t('account:login.header')}</LinkButton>
          </FVStack>
        </FVStack>
      </FCenter>
      <FCenter pt="5" pb="10">
        <LanguageMenu />
      </FCenter>
    </ScrollView>
  );
};

export default SignUp;
