import React from 'react';
import {useColorMode} from 'native-base';
import IconButton from './IconButton';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import FHStack from '../boxes/FHStack';

const ColorModeSwitch = () => {
  const {colorMode, toggleColorMode} = useColorMode();

  const icon = colorMode === 'light' ? <SunIcon /> : <MoonIcon />;

  return (
    <FHStack justifyContent="center">
      <IconButton icon={icon} onPress={toggleColorMode} />
    </FHStack>
  );
};

export default ColorModeSwitch;
