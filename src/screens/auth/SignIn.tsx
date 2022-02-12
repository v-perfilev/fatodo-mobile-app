import React, {FC} from 'react';
import {Box} from 'native-base';
import SignInForm from './SignInForm';

const SignIn: FC = () => {
  return (
    <Box safeArea py="5" w="90%" mx="auto" maxW="300">
      <SignInForm />
    </Box>
  );
};

export default SignIn;
