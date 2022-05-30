import React, {useCallback} from 'react';
import FScrollView from '../../components/boxes/FScrollView';
import FCenter from '../../components/boxes/FCenter';
import SolidButton from '../../components/controls/SolidButton';
import FVStack from '../../components/boxes/FVStack';
import {Text} from 'native-base';
import {useAppDispatch} from '../../store/store';
import LanguageMenu from '../../components/controls/LanguageMenu';
import Header from '../../components/layouts/Header';
import {AuthActions} from '../../store/auth/authActions';

const Account = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback((): void => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  return (
    <>
      <Header hideGoBack />
      <FScrollView>
        <FCenter grow>
          <FVStack defaultSpace alignItems="center">
            <Text>Account</Text>
            <SolidButton onPress={logout}>Log Out</SolidButton>
            <LanguageMenu />
          </FVStack>
        </FCenter>
      </FScrollView>
    </>
  );
};

export default Account;
