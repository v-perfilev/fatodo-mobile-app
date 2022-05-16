import React from 'react';
import {logout} from '../../store/actions/AuthActions';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import withHeader from '../../shared/hocs/withHeader';
import FScrollView from '../../components/surfaces/FScrollView';
import FCenter from '../../components/surfaces/FCenter';
import SolidButton from '../../components/controls/SolidButton';
import FVStack from '../../components/surfaces/FVStack';
import {Text} from 'native-base';

const mapDispatchToProps = {logout};
const connector = connect(null, mapDispatchToProps);

type AccountProps = ConnectedProps<typeof connector>;

const Account = ({logout}: AccountProps) => (
  <FScrollView>
    <FCenter grow>
      <FVStack defaultSpace alignItems="center">
        <Text>Account</Text>
        <SolidButton onPress={logout}>Log Out</SolidButton>
      </FVStack>
    </FCenter>
  </FScrollView>
);

export default flowRight([withHeader, connector])(Account);
