import React, {useCallback} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import UserFullView from '../../../components/views/UserFullView';
import AuthSelectors from '../../../store/auth/authSelectors';
import {Divider, ScrollView} from 'native-base';
import AccountChangePasswordForm from './AccountChangePasswordForm';
import {useTranslation} from 'react-i18next';
import AccountViewHeader from './AccountViewHeader';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import {DEFAULT_SPACE} from '../../../constants';

const AccountView = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const logout = useCallback((): void => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  return (
    <>
      <AccountViewHeader />
      <ScrollView p={DEFAULT_SPACE}>
        <FVStack defaultSpace>
          <UserFullView user={account} account={account} />
          <Divider bg="secondary.500" />
          {account.provider === 'LOCAL' && (
            <FVStack defaultSpace>
              <AccountChangePasswordForm />
              <Divider bg="secondary.500" />
            </FVStack>
          )}
          <OutlinedButton mt="3" onPress={logout}>
            {t('account:actions.logout')}
          </OutlinedButton>
        </FVStack>
      </ScrollView>
    </>
  );
};

export default AccountView;
