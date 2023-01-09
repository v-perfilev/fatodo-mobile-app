import React from 'react';
import {Box} from 'native-base';
import EnvSwitch from '../../../components/dev/EnvSwitch';

const SignInDev = () => {
  return (
    <Box position="absolute" zIndex="1" top="1" right="1" opacity="0">
      <EnvSwitch />
    </Box>
  );
};

export default SignInDev;
