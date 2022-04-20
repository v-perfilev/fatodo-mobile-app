import {useState} from 'react';

export const useLoadingState = (value = true, timeout = 500): [boolean, (loading: boolean) => void] => {
  const [loading, setLoading] = useState<boolean>(value);
  let timer: number;
  let timerId: NodeJS.Timeout;

  const resetTimer = (): void => {
    timer = new Date().getTime();
  };

  const getTimeDifference = (): number => {
    const now = new Date().getTime();
    return timer + timeout - now;
  };

  const updateLoading = (newLoading: boolean): void => {
    if (newLoading) {
      resetTimer();
      clearTimeout(timerId);
      setLoading(true);
    } else {
      const timeDifference = getTimeDifference();
      if (timeDifference > 0) {
        timerId = setTimeout(() => setLoading(false), timeDifference);
      } else {
        setLoading(false);
      }
    }
  };

  resetTimer();
  return [loading, updateLoading];
};
