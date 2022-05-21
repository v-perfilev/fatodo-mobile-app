import * as React from 'react';
import {ComponentType, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import {Box, useToast} from 'native-base';
import withNativeBase from '../withNativeBase';
import {useAppDispatch, useAppSelector} from '../../../store/hooks';
import SnackSelectors from '../../../store/snack/snackSelectors';
import {ReduxSnack} from '../../../store/snack/snackType';
import SnackActions from '../../../store/snack/snackActions';

const SnackDisplay = () => {
  const dispatch = useAppDispatch();
  const snackList = useAppSelector(SnackSelectors.list);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const {show, close} = useToast();

  const addDisplayed = (key: string): void => setDisplayed((prevState) => [...prevState, key]);
  const removeDisplayed = (key: string): void => setDisplayed((prevState) => prevState.filter((k) => k !== key));

  useEffect(() => {
    snackList.forEach(({message, color, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        close(key);
      } else if (!displayed.includes(key)) {
        const onCloseComplete = (): void => dispatch(SnackActions.removeSnack(key));
        show({title: message, bgColor: color, id: key, onCloseComplete});
        addDisplayed(key);
      }
    });
    const keyList = snackList.map((reduxSnack: ReduxSnack) => reduxSnack.key);
    displayed.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  });

  return <Box w="0" h="0" />;
};

const withSnackDisplay = (Component: ComponentType) => (props: any) => {
  return (
    <>
      <SnackDisplay />
      <Component {...props} />
    </>
  );
};

export default flowRight([withNativeBase, withSnackDisplay]);
