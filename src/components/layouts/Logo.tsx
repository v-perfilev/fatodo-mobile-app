import React from 'react';
import {Heading, Image} from 'native-base';
import FHStack from '../surfaces/FHStack';

const img = require('../../../assets/images/logo.png');

type LogoProps = {
  size?: number;
  withText?: boolean;
  centerText?: boolean;
};

const Logo = ({size = 50, withText, centerText}: LogoProps) => {
  return (
    <FHStack defaultSpace alignItems="center">
      <Image source={img} width={size} height={size} alt="Fatodo logo" />
      {withText && (
        <Heading size="3xl" color="primary.500" mr={centerText ? size : 0}>
          Fatodo
        </Heading>
      )}
    </FHStack>
  );
};

export default Logo;
