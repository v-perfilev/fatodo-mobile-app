import React, {FC} from 'react';
import Logo from '../../components/layouts/Logo';
import {Center, Stack} from 'native-base';
import LinkButton from '../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthStackNavigationProp} from '../../navigators/AuthNavigator';

const ForgotPassword: FC = () => {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const {t} = useTranslation();

  const goToSignIn = (): void => navigation.navigate('SignIn');

  return (
    <Center safeArea py="5" mx="auto" w="90%" maxW="300" minH="100%">
      <Logo withText />
      <Stack mt="5" space="2">
        <LinkButton onPress={goToSignIn}>{t('account:login.header')}</LinkButton>
      </Stack>
    </Center>
  );
};

export default ForgotPassword;
