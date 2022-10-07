import React, {Dispatch, memo, ReactElement, SetStateAction, useCallback, useMemo} from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {FormControl} from 'native-base';
import RoundButton from '../controls/RoundButton';
import {ArrayUtils} from '../../shared/utils/ArrayUtils';
import FContainer from '../boxes/FContainer';
import {useTranslation} from 'react-i18next';

type DaysSelectProps = {
  label: string;
  days: number[];
  setDays: Dispatch<SetStateAction<number[]>>;
};

const DaysSelect = ({label, days, setDays}: DaysSelectProps) => {
  const {i18n} = useTranslation();

  const dayNames = useMemo<string[]>(() => DateUtils.getWeekdayNames(), [i18n.language]);
  const dayNumbers = useMemo<number[]>(() => DateUtils.getWeekdayNumbers(), []);

  const handleClickOnDay = useCallback(
    (day: number): void => {
      setDays((prevState) => {
        if (prevState.includes(day)) {
          prevState = ArrayUtils.deleteValue(prevState, day);
        } else {
          prevState.push(day);
          prevState.sort();
        }
        return [...prevState];
      });
    },
    [setDays],
  );

  const weekdays = useMemo<ReactElement[]>(() => {
    return dayNames.map((weekday, index) => {
      const dayNumber = dayNumbers[index];

      const active = days.includes(dayNumber);
      const handleClick = (): void => handleClickOnDay(dayNumber);

      return (
        <RoundButton active={active} size={10} onPress={handleClick} key={index}>
          {weekday}
        </RoundButton>
      );
    });
  }, [days, dayNumbers, dayNames, handleClickOnDay]);

  return (
    <FormControl>
      {<FormControl.Label>{label}</FormControl.Label>}
      <FContainer itemMx="2" itemMy="1" justifyContent="center">
        {weekdays}
      </FContainer>
    </FormControl>
  );
};

export default memo(DaysSelect);
