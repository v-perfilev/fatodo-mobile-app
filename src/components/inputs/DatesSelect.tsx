import React, {Dispatch, SetStateAction} from 'react';
import {Flex, FormControl} from 'native-base';
import RoundButton from '../controls/RoundButton';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';

type DatesSelectProps = {
  label: string;
  dates: number[];
  setDates: Dispatch<SetStateAction<number[]>>;
};

const DatesSelect = ({label, dates, setDates}: DatesSelectProps) => {
  const handleClickOnDate = (date: number): void => {
    setDates((prevState) => {
      if (prevState.includes(date)) {
        ArrayUtils.deleteItem(prevState, date);
      } else {
        prevState.push(date);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  const monthArray = Array.from({length: 31}, (_, i) => i + 1);

  const monthDates = monthArray.map((date, index) => {
    const active = dates.includes(date);
    const handleClick = (): void => handleClickOnDate(date);
    return (
      <RoundButton m="1" size="9" bg={active ? 'grey.50' : undefined} onPress={handleClick} key={index}>
        {date}
      </RoundButton>
    );
  });

  return (
    <FormControl>
      {<FormControl.Label>{label}</FormControl.Label>}
      <Flex flexGrow="1" alignItems="center">
        <Flex flexDir="row" m="-1" wrap="wrap">
          {monthDates}
        </Flex>
      </Flex>
    </FormControl>
  );
};

export default DatesSelect;
