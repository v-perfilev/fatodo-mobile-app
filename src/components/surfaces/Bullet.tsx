import React from 'react';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import {Box} from 'native-base';

type BulletProps = {
  colorScheme?: ColorScheme;
  size?: string;
  fullWidth?: boolean;
};

const Bullet = ({colorScheme, size = '10px', fullWidth}: BulletProps) => {
  const width = fullWidth ? '100%' : size;
  const bg = colorScheme ? `${colorScheme}.400` : 'gray.400';

  return <Box width={width} height={size} borderRadius="full" bg={bg} />;
};

export default Bullet;
