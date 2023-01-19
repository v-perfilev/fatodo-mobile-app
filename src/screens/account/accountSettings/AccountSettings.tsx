import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';
import AccountSettingsForm from './AccountSettingsForm';
import Separator from '../../../components/layouts/Separator';
import AccountNotificationsForm from './AccountNotificationsForm';

const AccountSettings = () => {
  return (
    <>
      <Header />
      <SimpleScrollView>
        <AccountSettingsForm />
        <Separator my="5" />
        <AccountNotificationsForm />
      </SimpleScrollView>
    </>
  );
};

export default flowRight([memo, withKeyboardHeightAvoiding])(AccountSettings);
