import React, {useEffect} from 'react';
import FacebookIcon from '../../../components/icons/FacebookIcon';
import {LanguageUtils} from '../../../shared/utils/LanguageUtils';
import {DateUtils} from '../../../shared/utils/DateUtils';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import Separator from '../../../components/layouts/Separator';
import IconButton from '../../../components/controls/IconButton';
import {Linking} from 'react-native';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AppleIcon from '../../../components/icons/AppleIcon';
import GoogleIcon from '../../../components/icons/GoogleIcon';
import {Text, useColorModeValue} from 'native-base';
import {SnackActions} from '../../../store/snack/snackActions';
import {AuthActions} from '../../../store/auth/authActions';
import {useTranslation} from 'react-i18next';
import withInAppBrowser, {InAppBrowserProps} from '../../../shared/hocs/withInAppBrowser';
import AuthSelectors from '../../../store/auth/authSelectors';
import {API_CONFIG} from '../../../constants';

type SocialButtonsProps = InAppBrowserProps;

const SocialButtons = ({openBrowser, closeBrowser}: SocialButtonsProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();
  const appleColor = useColorModeValue('black', 'white');

  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_CONFIG.baseUrl + '/api/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage().toUpperCase();
    const timezoneParam = 'timezone=' + DateUtils.getTimezone();
    const redirectParam = 'redirect=' + 'fatodo://socialLogin';
    const oAuth2Url = apiUrl + '?' + languageParam + '&' + timezoneParam + '&' + redirectParam;
    openBrowser(oAuth2Url);
  };

  const googleLogin = (): void => oAuth2Login('google');
  const facebookLogin = (): void => oAuth2Login('facebook');
  const appleLogin = (): void => oAuth2Login('apple');

  const handleOAuth2Redirect = ({url}: {url: string}): void => {
    let params: any = {};
    const regex = new RegExp('socialLogin[?&]([^=#]+)=([^&#]*)');
    const match = regex.exec(url);
    if (match) {
      params[match[1]] = match[2];
      params.feedbackCode && dispatch(SnackActions.handleCode(params.feedbackCode, 'warning'));
      params.token && dispatch(AuthActions.socialLoginThunk(params.token));
      closeBrowser();
    }
  };

  useEffect(() => {
    Linking.addEventListener('url', handleOAuth2Redirect);
    Linking.getInitialURL().then((url) => {
      url && handleOAuth2Redirect({url});
    });
    return () => Linking.removeAllListeners('url');
  }, []);

  return (
    <FVStack space="5">
      <Separator />
      <FVStack space="1" alignItems="center">
        <Text color="gray.400">{t('account:socialLogin.label')}:</Text>
        <FHStack space="7" justifyContent="center">
          <IconButton size="2xl" icon={<GoogleIcon />} disabled={loading} onPress={googleLogin} />
          <IconButton size="2xl" icon={<FacebookIcon />} disabled={loading} onPress={facebookLogin} />
          <IconButton size="2xl" icon={<AppleIcon color={appleColor} />} disabled={loading} onPress={appleLogin} />
        </FHStack>
      </FVStack>
    </FVStack>
  );
};

export default withInAppBrowser(SocialButtons);
