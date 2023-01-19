import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';
import AccountChangePasswordForm from './AccountChangePasswordForm';

const AccountChangePassword = () => {
  return (
    <>
      <Header />
      <SimpleScrollView>
        <AccountChangePasswordForm />
      </SimpleScrollView>
    </>
  );
};

export default flowRight([memo, withKeyboardHeightAvoiding])(AccountChangePassword);
