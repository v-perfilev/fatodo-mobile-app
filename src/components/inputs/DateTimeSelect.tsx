import {Box, CheckIcon, Flex, FormControl, theme} from 'native-base';
import PressableButton from '../controls/PressableButton';
import ClearableTextInput from './ClearableTextInput';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import {DateFormatters, DateUtils} from '../../shared/utils/DateUtils';
import IconButton from '../controls/IconButton';

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

const getPickerMode = (mode: 'date' | 'time' | 'dateWithoutYear'): 'date' | 'time' => {
  if (mode === 'date' || mode === 'dateWithoutYear') {
    return 'date';
  } else {
    return 'time';
  }
};

const DateTimeSelect = ({label, setResult, mode, locale, minimumDate}: DateTimeSelectProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Date>(undefined);

  const initialValue = minimumDate || DateUtils.addMinutes(new Date(), 20);

  const formatter = getFormatter(mode);
  const pickerMode = getPickerMode(mode);

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

  useEffect(() => {
    if (show && !value) {
      setValue(initialValue);
    }
  }, [show]);

  const picker = (
    <DatePicker
      date={value || initialValue}
      onDateChange={setValue}
      mode={pickerMode}
      locale={locale}
      is24hourSource="locale"
      textColor={theme.colors.primary['700']}
      fadeToColor="none"
      minimumDate={minimumDate}
    />
  );

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
          {mode === 'dateWithoutYear' ? (
            <Box w={215} overflow="hidden">
              {picker}
            </Box>
          ) : (
            picker
          )}
          <Flex position="absolute" bottom="0" rounded="full" bg="gray.50">
            <IconButton icon={<CheckIcon />} onPress={closePicker} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default DateTimeSelect;
