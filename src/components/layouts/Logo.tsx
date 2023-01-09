import React from 'react';
import {Heading, Image} from 'native-base';
import FHStack from '../boxes/FHStack';

const img = require('../../../assets/images/logo.png');

type LogoProps = {
  size?: number;
  withText?: boolean;
};

const Logo = ({size = 50, withText}: LogoProps) => {
  return (
    <FHStack alignItems="center">
      <Image source={img} width={size} height={size} alt="Fatodo logo" />
      {withText && (
        <Heading size="3xl" color="primary.800" px={5}>
          Fatodo
        </Heading>
      )}
    </FHStack>
  );
};

export default Logo;
