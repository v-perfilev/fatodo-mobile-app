import {useState} from 'react';

export const useDelayedState = (initialValue = true, timeout = 100): [boolean, (value: boolean) => void] => {
  const [value, setValue] = useState<boolean>(initialValue);
  let timer: number;
  let timerId: NodeJS.Timeout;

  const resetTimer = (): void => {
    timer = new Date().getTime();
  };

  const getTimeDifference = (): number => {
    const now = new Date().getTime();
    return timer + timeout - now;
  };

  const updateValue = (newValue: boolean): void => {
    if (newValue) {
      resetTimer();
      clearTimeout(timerId);
      setValue(true);
    } else {
      const timeDifference = getTimeDifference();
      if (timeDifference > 0) {
        timerId = setTimeout(() => setValue(false), timeDifference);
      } else {
        setValue(false);
      }
    }
  };

  resetTimer();
  return [value, updateValue];
};
