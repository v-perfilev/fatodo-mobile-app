import React from 'react';
import {useTranslation} from 'react-i18next';
import {PRIVACY_POLICY_URL} from '../../constants';
import LinkButton from '../../components/controls/LinkButton';
import withInAppBrowser, {InAppBrowserProps} from '../../shared/hocs/withInAppBrowser';

type PrivacyPolicyLink = InAppBrowserProps;

const PrivacyPolicyLink = ({openBrowser}: PrivacyPolicyLink) => {
  const {t} = useTranslation();

  const openPrivacyPolicyInBrowser = (): void => {
    openBrowser(PRIVACY_POLICY_URL);
  };

  return (
    <LinkButton size="sm" onPress={openPrivacyPolicyInBrowser}>
      {t('common:links.privacyPolicy')}
    </LinkButton>
  );
};

export default withInAppBrowser(PrivacyPolicyLink);
