import React, {Dispatch, SetStateAction} from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {FormControl} from 'native-base';
import RoundButton from '../controls/RoundButton';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import FContainer from '../boxes/FContainer';

type DaysSelectProps = {
  label: string;
  days: number[];
  setDays: Dispatch<SetStateAction<number[]>>;
};

const DaysSelect = ({label, days, setDays}: DaysSelectProps) => {
  const dayNames = DateUtils.getWeekdayNames();
  const dayNumbers = DateUtils.getWeekdayNumbers();

  const handleClickOnDay = (day: number): void => {
    setDays((prevState) => {
      if (prevState.includes(day)) {
        prevState = ArrayUtils.deleteValue(prevState, day);
      } else {
        prevState.push(day);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  const weekdays = dayNames.map((weekday, index) => {
    const dayNumber = dayNumbers[index];

    const active = days.includes(dayNumber);
    const handleClick = (): void => handleClickOnDay(dayNumber);

    return (
      <RoundButton size={10} bg={active ? 'grey.50' : undefined} onPress={handleClick} key={index}>
        {weekday}
      </RoundButton>
    );
  });

  return (
    <FormControl>
      {<FormControl.Label>{label}</FormControl.Label>}
      <FContainer itemMx="2" itemMy="1" justifyContent="center">
        {weekdays}
      </FContainer>
    </FormControl>
  );
};

export default DaysSelect;
