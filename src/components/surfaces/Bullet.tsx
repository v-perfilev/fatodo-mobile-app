import React from 'react';
import {ColorScheme} from '../../shared/themes/ThemeFactory';
import {Box} from 'native-base';

type BulletProps = {
  colorScheme?: ColorScheme;
  height?: string;
  fullWidth?: boolean;
};

const Bullet = ({colorScheme, height = '10px', fullWidth}: BulletProps) => {
  const width = fullWidth ? '100%' : height;

  const bg = colorScheme ? `${colorScheme}.400` : 'gray.400';

  return <Box width={width} height={height} borderRadius="full" bg={bg} />;
};

export default Bullet;
