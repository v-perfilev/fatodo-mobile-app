import React, {Dispatch, SetStateAction} from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {Flex, FormControl} from 'native-base';
import RoundButton from '../controls/RoundButton';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';

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
        prevState = ArrayUtils.deleteItem(prevState, day);
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
      <RoundButton mx="2" my="1" size="10" bg={active ? 'grey.50' : undefined} onPress={handleClick} key={index}>
        {weekday}
      </RoundButton>
    );
  });

  return (
    <FormControl>
      {<FormControl.Label>{label}</FormControl.Label>}
      <Flex flexDir="row" mx="-2" my="-1" wrap="wrap" justifyContent="center">
        {weekdays}
      </Flex>
    </FormControl>
  );
};

export default DaysSelect;
