import {CheckIcon, Flex, FormControl} from 'native-base';
import PressableButton from '../controls/PressableButton';
import ClearableTextInput from './ClearableTextInput';
import React, {useState} from 'react';
import {DateFormatters} from '../../shared/utils/DateUtils';
import IconButton from '../controls/IconButton';
import DateTimePicker from './DateTimePicker';

type DateTimeSelectProps = {
  label: string;
  setResult: (time: Date) => void;
  mode: 'date' | 'time' | 'dateWithoutYear';
  locale: string;
  minimumDate?: Date;
};

const getFormatter = (mode: 'date' | 'time' | 'dateWithoutYear'): ((date: Date) => string) => {
  switch (mode) {
    case 'date':
      return DateFormatters.formatDateWithYear;
    case 'time':
      return DateFormatters.formatTime;
    case 'dateWithoutYear':
      return DateFormatters.formatDate;
  }
};

const DateTimeSelect = ({label, setResult, mode, locale, minimumDate}: DateTimeSelectProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Date>(undefined);

  const formatter = getFormatter(mode);

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

  return (
    <>
      <FormControl>
        {<FormControl.Label>{label}</FormControl.Label>}
        <PressableButton onPress={openPicker}>
          <ClearableTextInput
            type="text"
            value={value ? formatter(value) : undefined}
            onChangeText={handleChangeText}
            editable={false}
          />
        </PressableButton>
      </FormControl>

      {show && (
        <Flex width="100%" height="100%" position="absolute" alignItems="center" zIndex="1000" bg="gray.50">
          <DateTimePicker setValue={setValue} mode={mode} locale={locale} minDate={minimumDate} />
          <Flex position="absolute" bottom="0">
            <IconButton icon={<CheckIcon />} onPress={closePicker} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default DateTimeSelect;
