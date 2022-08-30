import React from 'react';
import {Heading, Image} from 'native-base';
import FHStack from '../boxes/FHStack';

const img = require('../../../assets/images/logo.png');

type LogoProps = {
  size?: number | string;
  withText?: boolean;
  centerText?: boolean;
};

const Logo = ({size = 50, withText, centerText}: LogoProps) => {
  return (
    <FHStack alignItems="center">
      <Image source={img} width={size} height={size} alt="Fatodo logo" />
      {withText && (
        <Heading size="3xl" color="primary.500" px={2} mr={centerText ? size : 0}>
          Fatodo
        </Heading>
      )}
    </FHStack>
  );
};

export default Logo;
