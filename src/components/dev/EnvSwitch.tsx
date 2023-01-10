import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Button} from 'native-base';
import {API_URL_DEV, API_URL_PROD, IS_DEVELOPMENT, SET_API_URL} from '../../constants';
import {Alert} from 'react-native';

type ENV = 'dev' | 'prod';

type CounterState = {
  value: number;
};

enum CounterAction {
  INCREASE,
  RESET,
}

const counterReducer = (counter: CounterState, action: CounterAction) => {
  switch (action) {
    case CounterAction.INCREASE:
      return {value: counter.value + 1};
    case CounterAction.RESET:
      return {value: 0};
    default:
      return counter;
  }
};

const RESET_TIMEOUT = 500;
const SWITCHING_THRESHOLD = 15;

const EnvSwitch = () => {
  const [env, setEnv] = useState<ENV>(IS_DEVELOPMENT ? 'dev' : 'prod');
  const [counter, counterDispatch] = useReducer(counterReducer, {value: 0});
  const timeoutId = useRef<NodeJS.Timeout>();

  const handleClick = (): void => {
    clearTimeout(timeoutId.current);
    counterDispatch(CounterAction.INCREASE);
    timeoutId.current = setTimeout(() => counterDispatch(CounterAction.RESET), RESET_TIMEOUT);
  };

  useEffect(() => {
    if (counter.value >= SWITCHING_THRESHOLD) {
      counterDispatch(CounterAction.RESET);
      const newEnv = env === 'dev' ? 'prod' : 'dev';
      const newApiUrl = newEnv === 'dev' ? API_URL_DEV : API_URL_PROD;
      setEnv(newEnv);
      SET_API_URL(newApiUrl);
      Alert.alert(`Env switched to "${newEnv}"`);
    }
  }, [counter]);

  return <Button width="10" height="10" onPress={handleClick} />;
};

export default EnvSwitch;
