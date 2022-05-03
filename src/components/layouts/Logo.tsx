import React from 'react';
import {Heading, HStack, Image} from 'native-base';

const img = require('../../../assets/images/logo.png');

type LogoProps = {
  size?: number;
  withText?: boolean;
  centerText?: boolean;
};

const Logo = ({size = 50, withText, centerText}: LogoProps) => {
  return (
    <HStack space="3" alignItems="center">
      <Image source={img} width={size} height={size} alt="Fatodo logo" />
      {withText && (
        <Heading size="3xl" color="primary.500" mr={centerText ? size : 0}>
          Fatodo
        </Heading>
      )}
    </HStack>
  );
};

export default Logo;
