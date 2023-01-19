import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import Header from '../../../components/layouts/Header';
import {useTranslation} from 'react-i18next';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import Separator from '../../../components/layouts/Separator';
import {useAccountDialogContext} from '../../../shared/contexts/dialogContexts/AccountDialogContext';
import {flowRight} from 'lodash';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';
import AccountMainForm from './AccountMainForm';

const AccountMain = () => {
  const {showDeletePermanentlyDialog} = useAccountDialogContext();
  const {t} = useTranslation();

  return (
    <>
      <Header />
      <SimpleScrollView>
        <FVStack space={3}>
          <AccountMainForm />
          <Separator />
          <OutlinedButton colorScheme="error" onPress={showDeletePermanentlyDialog}>
            {t('account:actions.deletePermanently')}
          </OutlinedButton>
        </FVStack>
      </SimpleScrollView>
    </>
  );
};

export default flowRight([memo, withKeyboardHeightAvoiding])(AccountMain);
