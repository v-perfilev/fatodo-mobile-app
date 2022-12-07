import React from 'react';
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

const SocialButtons = () => {
  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_URL + '/api/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage().toUpperCase();
    const timezoneParam = 'timezone=' + DateUtils.getTimezone();
    const redirectParam = 'redirect=' + 'TODO';
    const oAuth2Url = apiUrl + '?' + languageParam + '&' + timezoneParam + '&' + redirectParam;
    Linking.openURL(oAuth2Url).finally();
  };

  const facebookLogin = (): void => oAuth2Login('facebook');
  const googleLogin = (): void => oAuth2Login('google');

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
