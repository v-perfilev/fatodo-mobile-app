import React from 'react';
import {Text} from 'react-native';
import {Center} from 'native-base';
import SolidButton from '../../components/controls/SolidButton';
import {logout} from '../../store/actions/AuthActions';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import withHeader from '../../shared/hocs/withHeader';

const mapDispatchToProps = {logout};
const connector = connect(null, mapDispatchToProps);

type AccountProps = ConnectedProps<typeof connector>;

const Account = ({logout}: AccountProps) => {
  const handlePress = (): void => {
    logout();
  };

  return (
    <Center safeArea w="100%" h="100%">
      <Text>Account</Text>
      <SolidButton mt="10" onPress={handlePress}>
        Log Out
      </SolidButton>
    </Center>
  );
};

export default flowRight([withHeader, connector])(Account);
