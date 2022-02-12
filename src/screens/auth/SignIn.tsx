import React, {FC} from 'react';
import SignInForm from './SignInForm';
import Logo from '../../components/layouts/Logo';
import {Center} from 'native-base';

const SignIn: FC = () => {
  return (
    <Center safeArea py="5" mx="auto" w="90%" maxW="300" minH="100%">
      <Logo withText />
      <SignInForm />
    </Center>
  );
};

export default SignIn;
