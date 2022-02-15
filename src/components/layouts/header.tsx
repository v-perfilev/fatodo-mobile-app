import React, {FC} from 'react';
import {Box, Text} from 'native-base';
import {NavigationProp, ParamListBase} from '@react-navigation/native';

type HeaderProps = NavigationProp<ParamListBase> & {} & any;

const Header: FC<HeaderProps> = (props) => {
  console.log(props);

  return (
    <Box>
      <Box>
        <Text>Header</Text>
      </Box>
    </Box>
  );
};

export default Header;
