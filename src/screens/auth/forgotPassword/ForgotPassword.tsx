import React, {FC} from 'react';
import Logo from '../../../components/layouts/Logo';
import {Box, Center, ScrollView, Stack} from 'native-base';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {AuthNavigationProp} from '../../../navigators/AuthNavigator';
import ForgotPasswordForm from './ForgotPasswordForm';
import LanguageMenu from '../../../components/controls/LanguageMenu';

const ForgotPassword: FC = () => {
  const navigation = useNavigation<AuthNavigationProp>();
  const {t} = useTranslation();

  const goToSignIn = (): void => navigation.navigate('SignIn');

  const containerStyle = {flexGrow: 1};

  return (
    <ScrollView keyboardShouldPersistTaps="handled" _contentContainerStyle={containerStyle}>
      <Center flex="1" flexGrow="1" pt="10" pb="5">
        <Box w="90%" maxW="300">
          <Center flex="1">
            <Logo withText centerText />
          </Center>
          <ForgotPasswordForm onSuccess={goToSignIn} />
          <Stack mt="5" space="2">
            <LinkButton onPress={goToSignIn}>{t('account:login.header')}</LinkButton>
          </Stack>
        </Box>
      </Center>
      <Center flex="1" flexGrow="0" pt="5" pb="10">
        <LanguageMenu />
      </Center>
    </ScrollView>
  );
};

export default ForgotPassword;
