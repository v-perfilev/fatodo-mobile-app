import React, {useEffect} from 'react';
import {useColorMode} from 'native-base';
import IconButton from './IconButton';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import FHStack from '../boxes/FHStack';
import {useAppDispatch} from '../../store/store';
import {CommonActions} from '../../store/common/commonActions';

const ColorModeSwitch = () => {
  const dispatch = useAppDispatch();
  const {colorMode, toggleColorMode} = useColorMode();

  const icon = colorMode === 'light' ? <SunIcon /> : <MoonIcon />;

  const handlePress = async (): Promise<void> => {
    await dispatch(CommonActions.setFreezeTabs(true));
    await dispatch(CommonActions.setFreezeCalendar(true));
    toggleColorMode();
  };

  useEffect(() => {
    dispatch(CommonActions.setFreezeTabs(false));
    setTimeout(() => dispatch(CommonActions.setFreezeCalendar(false)), 1000);
  }, [colorMode]);

  return (
    <FHStack justifyContent="center">
      <IconButton icon={icon} onPress={handlePress} />
    </FHStack>
  );
};

export default ColorModeSwitch;
