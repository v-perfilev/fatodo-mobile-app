import React, {useEffect} from 'react';
import {API_URL} from '../../../constants';
import FacebookIcon from '../../../components/icons/FacebookIcon';
import {LanguageUtils} from '../../../shared/utils/LanguageUtils';
import {DateUtils} from '../../../shared/utils/DateUtils';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import Separator from '../../../components/layouts/Separator';
import IconButton from '../../../components/controls/IconButton';
import GoogleIcon from '../../../components/icons/GoogleIcon';
import {Linking} from 'react-native';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';

const SocialButtons = () => {
  const dispatch = useAppDispatch();

  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_URL + '/api/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage().toUpperCase();
    const timezoneParam = 'timezone=' + DateUtils.getTimezone();
    const redirectParam = 'redirect=' + 'fatodo://socialLogin';
    const oAuth2Url = apiUrl + '?' + languageParam + '&' + timezoneParam + '&' + redirectParam;
    Linking.openURL(oAuth2Url).finally();
  };

  const facebookLogin = (): void => oAuth2Login('facebook');
  const googleLogin = (): void => oAuth2Login('google');

  const handleOAuth2Redirect = ({url}: {url: string}): void => {
    const regex = new RegExp('socialLogin/(.+)#_=_$');
    const regexArray = regex.exec(url);
    const token = regexArray.length === 2 ? regexArray[1] : undefined;
    token && dispatch(AuthActions.socialLoginThunk(token));
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
      <FHStack space="5" justifyContent="center">
        <IconButton size="2xl" icon={<FacebookIcon />} onPress={facebookLogin} />
        <IconButton size="2xl" icon={<GoogleIcon />} onPress={googleLogin} />
      </FHStack>
    </FVStack>
  );
};

export default SocialButtons;
