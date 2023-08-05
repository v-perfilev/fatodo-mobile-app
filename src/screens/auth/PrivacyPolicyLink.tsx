import React from 'react';
import {useTranslation} from 'react-i18next';
import {PRIVACY_POLICY_URL} from '../../constants';
import LinkButton from '../../components/controls/LinkButton';
import {Linking} from 'react-native';

const PrivacyPolicyLink = () => {
  const {t} = useTranslation();

  const openPrivacyPolicyInBrowser = (): void => {
    Linking.openURL(PRIVACY_POLICY_URL).finally();
  };

  return (
    <LinkButton size="sm" onPress={openPrivacyPolicyInBrowser}>
      {t('common:links.privacyPolicy')}
    </LinkButton>
  );
};

export default PrivacyPolicyLink;
