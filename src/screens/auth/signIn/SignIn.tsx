import React, {useEffect} from 'react';
import SignInForm from './SignInForm';
import Logo from '../../../components/layouts/Logo';
import LinkButton from '../../../components/controls/LinkButton';
import {useTranslation} from 'react-i18next';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AuthNavigationProps, AuthParamList} from '../../../navigators/AuthNavigator';
import LanguageMenu from '../../../components/controls/LanguageMenu';
import FCenter from '../../../components/boxes/FCenter';
import FVStack from '../../../components/boxes/FVStack';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import ColorModeSwitch from '../../../components/controls/ColorModeSwitch';
import SocialButtons from './SocialButtons';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';

const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<AuthNavigationProps>();
  const {t} = useTranslation();
  const route = useRoute<RouteProp<AuthParamList, 'SignIn'>>();
  const activationCode = route.params?.activationCode;

  const goToForgotPassword = (): void => navigation.navigate('ForgotPassword');
  const goToSignUp = (): void => navigation.navigate('SignUp');

  useEffect(() => {
    activationCode && dispatch(AuthActions.activateThunk(activationCode));
  }, [activationCode]);

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
