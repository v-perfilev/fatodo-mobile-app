import React, {FC} from 'react';
import {Heading, HStack, Image} from 'native-base';

const img = require('../../../assets/images/logo.png');

type LogoProps = {
  size?: number;
  withText?: boolean;
};

const Logo: FC<LogoProps> = ({size = 60, withText}) => {
  return (
    <HStack space="3" alignItems="center">
      <Image source={img} width={size} height={size} alt="Fatodo logo" />
      {withText && (
        <Heading size="3xl" color="primary.500">
          Fatodo
        </Heading>
      )}
    </HStack>
  );
};

export default Logo;
