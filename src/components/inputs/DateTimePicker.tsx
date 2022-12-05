import {Box, useColorModeValue, useTheme} from 'native-base';
import DatePicker from 'react-native-date-picker';
import React, {useEffect, useState} from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {UserAccount} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {Platform} from 'react-native';

type PickMode = 'fullDate' | 'shortDate' | 'time';

type DateTimePickerProps = {
  value?: Date;
  setValue: (value: Date) => void;
  mode: PickMode;
  minDate?: Date;
  maxDate?: Date;
};

const calcMode = (mode: PickMode): 'time' | 'date' => (mode === 'time' ? 'time' : 'date');

const calcWidth = (mode: PickMode): string => {
  let width;
  if (mode === 'shortDate') {
    width = Platform.OS === 'android' ? '215px' : '180px';
  }
  return width;
};

const calcMarginLeft = (mode: PickMode): string => {
  let marginLeft;
  if (mode === 'shortDate') {
    marginLeft = Platform.OS === 'android' ? '0px' : '-15px';
  }
  return marginLeft;
};

const calcOverflow = (mode: PickMode): string => {
  let overflow;
  if (mode === 'shortDate') {
    overflow = 'hidden';
  }
  return overflow;
};

const calcLocale = (mode: PickMode, account: UserAccount) => {
  const timeFormat = account.settings.timeFormat;
  let locale = account.settings.language.toLowerCase();
  if (mode === 'time') {
    locale = timeFormat === 'H12' ? 'en_US' : 'en_GB';
  }
  return locale;
};

const DateTimePicker = ({value, setValue, mode, minDate, maxDate}: DateTimePickerProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const theme = useTheme();
  const [dataValue, setDataValue] = useState<Date>(value || minDate || DateUtils.addMinutes(new Date(), 20));

  const pickerMode = calcMode(mode);
  const width = calcWidth(mode);
  const marginLeft = calcMarginLeft(mode);
  const overflow = calcOverflow(mode);
  const localeMode = calcLocale(mode, account);

  const handleDateChange = (date: Date): void => {
    setValue(date);
    setDataValue(date);
  };

  useEffect(() => {
    setValue(dataValue);
  }, []);

  useEffect(() => {
    value && setDataValue(value);
  }, [value]);

  const androidTextColor = useColorModeValue(theme.colors.gray['600'], theme.colors.gray['300']);
  const iosTextColor = useColorModeValue('black', 'white');

  return (
    <Box width={width} overflow={overflow}>
      <Box ml={marginLeft}>
        <DatePicker
          date={dataValue}
          onDateChange={handleDateChange}
          mode={pickerMode}
          locale={localeMode}
          is24hourSource="locale"
          textColor={Platform.OS === 'android' ? androidTextColor : iosTextColor}
          fadeToColor="none"
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      </Box>
    </Box>
  );
};

export default DateTimePicker;
