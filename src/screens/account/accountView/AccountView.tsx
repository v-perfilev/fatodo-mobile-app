import React, {useCallback} from 'react';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import UserFullView from '../../../components/views/UserFullView';
import AuthSelectors from '../../../store/auth/authSelectors';
import {Divider} from 'native-base';
import AccountChangePasswordForm from './AccountChangePasswordForm';
import {useTranslation} from 'react-i18next';
import SolidButton from '../../../components/controls/SolidButton';
import AccountViewHeader from './AccountViewHeader';

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
      <FScrollView>
        <FVStack defaultSpace>
          <UserFullView user={account} account={account} />
          <Divider bg="secondary.500" />
          {account.provider === 'LOCAL' && (
            <FVStack defaultSpace>
              <AccountChangePasswordForm />
              <Divider bg="secondary.500" />
            </FVStack>
          )}
          <SolidButton mt="3" onPress={logout}>
            {t('account:actions.logout')}
          </SolidButton>
        </FVStack>
      </FScrollView>
    </>
  );
};

export default AccountView;
