import {CheckIcon, Flex, FormControl, useColorModeValue} from 'native-base';
import PressableButton from '../controls/PressableButton';
import ClearableTextInput from './ClearableTextInput';
import React, {useMemo, useState} from 'react';
import DateTimePicker from './DateTimePicker';
import {UserAccount} from '../../models/User';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import IconButton from '../controls/IconButton';
import {DARK_BG, LIGHT_BG} from '../../shared/themes/colors';

type DateTimeSelectMode = 'fullDate' | 'shortDate' | 'time';

type DateTimeSelectProps = {
  label: string;
  setResult: (time: Date) => void;
  mode: DateTimeSelectMode;
  minimumDate?: Date;
};

const formatValue = (date: Date, account: UserAccount, mode: DateTimeSelectMode): string => {
  switch (mode) {
    case 'fullDate':
      return DateFormatters.formatDate(date, account, undefined, 'FULL');
    case 'shortDate':
      return DateFormatters.formatDate(date, account, undefined, 'SHORT');
    case 'time':
      return DateFormatters.formatDate(date, account, 'FULL');
  }
};

const DateTimeSelect = ({label, setResult, mode, minimumDate}: DateTimeSelectProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Date>(undefined);

  const formattedValue = useMemo<string>(() => {
    return value ? formatValue(value, account, mode) : undefined;
  }, [value]);

  const openPicker = (): void => setShow(true);

  const closePicker = (): void => {
    setResult(value);
    setShow(false);
  };

  const handleChangeText = (text: string): void => {
    if (text === undefined) {
      setValue(undefined);
      setResult(undefined);
    }
  };

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);

  return (
    <>
      <FormControl>
        {<FormControl.Label>{label}</FormControl.Label>}
        <PressableButton onPress={openPicker}>
          <ClearableTextInput type="text" value={formattedValue} onChangeText={handleChangeText} editable={false} />
        </PressableButton>
      </FormControl>

      {show && (
        <Flex width="100%" height="100%" position="absolute" alignItems="center" zIndex="1000" bg={bg}>
          <DateTimePicker setValue={setValue} mode={mode} minDate={minimumDate} />
          <Flex position="absolute" bottom="0">
            <IconButton icon={<CheckIcon />} onPress={closePicker} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default DateTimeSelect;
