import React, {Dispatch, memo, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {FormControl} from 'native-base';
import RoundButton from '../controls/RoundButton';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import FContainer from '../boxes/FContainer';

type DatesSelectProps = {
  label: string;
  dates: number[];
  setDates: Dispatch<SetStateAction<number[]>>;
};

const DatesSelect = ({label, dates, setDates}: DatesSelectProps) => {
  const handleClickOnDate = useCallback(
    (date: number): void => {
      setDates((prevState) => {
        if (prevState.includes(date)) {
          prevState = ArrayUtils.deleteValue(prevState, date);
        } else {
          prevState.push(date);
          prevState.sort();
        }
        return [...prevState];
      });
    },
    [setDates],
  );

  const monthDates = useMemo<ReactElement[]>(
    () =>
      Array.from({length: 31}, (_, i) => i + 1).map((date, index) => {
        const active = dates.includes(date);
        const handleClick = (): void => handleClickOnDate(date);
        return (
          <RoundButton active={active} size={9} onPress={handleClick} key={index}>
            {date}
          </RoundButton>
        );
      }),
    [dates, handleClickOnDate],
  );

  return (
    <FormControl>
      {<FormControl.Label>{label}</FormControl.Label>}
      <FContainer itemM="1">{monthDates}</FContainer>
    </FormControl>
  );
};

export default memo(DatesSelect);
