import React, {FC, useState} from 'react';
import {StatusBar} from 'react-native';
import SignInForm from './SignInForm';

const SignIn: FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <>
      <StatusBar />
      <SignInForm {...{loading, setLoading}} />
    </>
  );
};

export default SignIn;
