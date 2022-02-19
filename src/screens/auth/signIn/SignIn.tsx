import React, {FC, useState} from 'react';
import SignInForm from './SignInForm';
import Logo from '../../../components/layouts/Logo';
import {Box, Center, ScrollView, Stack} from 'native-base';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import LanguageMenu from '../../../components/layouts/LanguageMenu';

const SignIn: FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();
  const [isLoading, setLoading] = useState<boolean>(false);

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  const containerStyle = {flexGrow: 1};

  return (
    <ScrollView keyboardShouldPersistTaps="handled" _contentContainerStyle={containerStyle}>
      <Center flex="1" flexGrow="1" pt="10" pb="5">
        <Box w="90%" maxW="300">
          <Center flex="1">
            <Logo withText centerText />
          </Center>
          <SignInForm {...{isLoading, setLoading}} />
          <Stack mt="5" space="2">
            <LinkButton onPress={goToForgotPassword}>{t('account:forgotPassword.header')}</LinkButton>
            <LinkButton onPress={goToSignUp}>{t('account:register.header')}</LinkButton>
          </Stack>
        </Box>
      </Center>
      <Center flex="1" flexGrow="0" pt="5" pb="10">
        <LanguageMenu />
      </Center>
    </ScrollView>
  );
};

export default SignIn;
