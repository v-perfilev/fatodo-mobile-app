import React, {ComponentType, memo, useState} from 'react';
import {flowRight} from 'lodash';
import {useColorModeValue, useToast} from 'native-base';
import {useAppDispatch, useAppSelector} from '../../store/store';
import SnackSelectors from '../../store/snack/snackSelectors';
import {SnackActions} from '../../store/snack/snackActions';
import {ReduxSnack} from '../../models/Snack';

const withSnackDisplay = (Component: ComponentType) => (props: any) => {
  const dispatch = useAppDispatch();
  const snackList = useAppSelector(SnackSelectors.list);
  const [displayed, setDisplayed] = useState<Map<string, string>>(new Map());
  const {show, close} = useToast();

  const addDisplayed = (key: string, message: string): void =>
    setDisplayed((prevState) => {
      prevState.set(key, message);
      return new Map([...prevState]);
    });
  const removeDisplayed = (key: string): void =>
    setDisplayed((prevState) => {
      prevState.delete(key);
      return new Map([...prevState]);
    });
  const displayedKeys = Array.from(displayed.keys());
  const displayedMessages = Array.from(displayed.values());

  const bg = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.400', 'gray.500');

  const handleSnacks = (): void => {
    snackList.forEach(({message, color, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        close(key);
      } else if (!displayedKeys.includes(key) && displayedMessages.includes(message)) {
        dispatch(SnackActions.removeSnack(key));
      } else if (!displayedKeys.includes(key)) {
        const onCloseComplete = (): void => dispatch(SnackActions.removeSnack(key));
        show({
          title: message,
          borderColor: borderColor,
          borderWidth: 0.5,
          borderRadius: 8,
          bg: bg,
          _title: {color, px: 2, py: 1},
          id: key,
          onCloseComplete,
        });
        addDisplayed(key, message);
      }
    });
    const keyList = snackList.map((reduxSnack: ReduxSnack) => reduxSnack.key);
    displayedKeys.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  };

  handleSnacks();

  return <Component {...props} />;
};

export default flowRight([memo, withSnackDisplay]);
