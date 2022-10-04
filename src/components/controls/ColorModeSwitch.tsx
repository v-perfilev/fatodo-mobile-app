import React, {useEffect, useState} from 'react';
import {Spinner, useColorMode} from 'native-base';
import IconButton from './IconButton';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import FHStack from '../boxes/FHStack';
import {useAppDispatch} from '../../store/store';
import {CommonActions} from '../../store/common/commonActions';

const ColorModeSwitch = () => {
  const dispatch = useAppDispatch();
  const {colorMode, toggleColorMode} = useColorMode();
  const [loading, setLoading] = useState<boolean>(false);

  const icon = colorMode === 'light' ? <SunIcon /> : <MoonIcon />;

  const handlePress = async (): Promise<void> => {
    setLoading(true);
    await dispatch(CommonActions.setFreeze(true));
    toggleColorMode();
  };

  useEffect(() => {
    dispatch(CommonActions.setFreeze(false));
    setTimeout(() => setLoading(false), 100);
  }, [colorMode]);

  return (
    <FHStack h="40px" justifyContent="center" alignItems="center">
      {!loading && <IconButton icon={icon} onPress={handlePress} />}
      {loading && <Spinner />}
    </FHStack>
  );
};

export default ColorModeSwitch;
