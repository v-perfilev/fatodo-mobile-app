import {CheckIcon, Flex, FormControl, theme} from 'native-base';
import PressableButton from '../controls/PressableButton';
import ClearableTextInput from './ClearableTextInput';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import {DateFormatters, DateUtils} from '../../shared/utils/DateUtils';
import IconButton from '../controls/IconButton';

type DateTimeSelectProps = {
  label: string;
  setResult: (time: Date) => void;
  mode: 'date' | 'time';
  locale: string;
  minimumDate?: Date;
};

const DateTimeSelect = ({label, setResult, mode, locale, minimumDate}: DateTimeSelectProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState<Date>(undefined);

  const initialValue = minimumDate || DateUtils.addMinutes(new Date(), 20);

  const formatter = mode === 'date' ? DateFormatters.formatDateWithYear : DateFormatters.formatTime;

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
          <DatePicker
            date={value || initialValue}
            onDateChange={setValue}
            mode={mode}
            locale={locale}
            is24hourSource="locale"
            textColor={theme.colors.primary['700']}
            fadeToColor="none"
            minimumDate={minimumDate}
          />

          <Flex position="absolute" bottom="0" rounded="full" bg="gray.50">
            <IconButton icon={<CheckIcon />} onPress={closePicker} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default DateTimeSelect;
