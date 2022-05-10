import * as React from 'react';
import {ComponentType, PropsWithChildren, useEffect, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {flowRight} from 'lodash';
import {Box, useToast} from 'native-base';
import withNativeBase from '../withNativeBase';
import {RootState} from '../../../store';
import {ReduxSnack, ReduxSnackState} from '../../../store/rerducers/SnackReducer';
import {removeReduxSnack} from '../../../store/actions/SnackActions';

const mapStateToProps = (state: RootState): {snackState: ReduxSnackState} => ({snackState: state.snackState});
const mapDispatchToProps = {removeReduxSnack};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = PropsWithChildren<ConnectedProps<typeof connector>>;

const SnackDisplay = ({snackState, removeReduxSnack}: Props) => {
  const [displayed, setDisplayed] = useState<string[]>([]);
  const {show, close} = useToast();

  const addDisplayed = (key: string): void => setDisplayed((prevState) => [...prevState, key]);
  const removeDisplayed = (key: string): void => setDisplayed((prevState) => prevState.filter((k) => k !== key));

  useEffect(() => {
    snackState.list.forEach(({message, color, key, dismissed = false}: ReduxSnack) => {
      if (dismissed) {
        close(key);
      } else if (!displayed.includes(key)) {
        show({title: message, bgColor: color, id: key, onCloseComplete: () => removeReduxSnack(key)});
        addDisplayed(key);
      }
    });
    const keyList = snackState.list.map((reduxSnack: ReduxSnack) => reduxSnack.key);
    displayed.filter((key) => !keyList.includes(key)).forEach(removeDisplayed);
  });

  return <Box w="0" h="0" />;
};

const withSnackDisplay =
  (Component: ComponentType) =>
  ({snackState, removeReduxSnack, ...props}: Props) => {
    return (
      <>
        <SnackDisplay snackState={snackState} removeReduxSnack={removeReduxSnack} />
        <Component {...props} />
      </>
    );
  };

export default flowRight([connector, withNativeBase, withSnackDisplay]);
