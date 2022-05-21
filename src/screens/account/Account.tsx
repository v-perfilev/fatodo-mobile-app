import React, {useCallback} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../shared/hocs/withHeader';
import FScrollView from '../../components/surfaces/FScrollView';
import FCenter from '../../components/surfaces/FCenter';
import SolidButton from '../../components/controls/SolidButton';
import FVStack from '../../components/surfaces/FVStack';
import {Text} from 'native-base';
import {useAppDispatch} from '../../store/store';
import AuthActions from '../../store/auth/authActions';

const Account = () => {
  const dispatch = useAppDispatch();

  const logout = useCallback((): void => {
    dispatch(AuthActions.logout());
  }, [dispatch]);

  return (
    <FScrollView>
      <FCenter grow>
        <FVStack defaultSpace alignItems="center">
          <Text>Account</Text>
          <SolidButton onPress={logout}>Log Out</SolidButton>
        </FVStack>
      </FCenter>
    </FScrollView>
  );
};

export default flowRight([withHeader])(Account);
