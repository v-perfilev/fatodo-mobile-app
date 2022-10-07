import {Box, useColorModeValue, useTheme} from 'native-base';
import DatePicker from 'react-native-date-picker';
import React, {useEffect} from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {UserAccount} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

type PickMode = 'fullDate' | 'shortDate' | 'monthWithYear' | 'time';

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
    width = '215px';
  } else if (mode === 'monthWithYear') {
    width = '190px';
  }
  return width;
};

const calcMarginLeft = (mode: PickMode): string => {
  let marginLeft;
  if (mode === 'monthWithYear') {
    marginLeft = '-80px';
  }
  return marginLeft;
};

const calcOverflow = (mode: PickMode): string => {
  let overflow;
  if (mode === 'shortDate') {
    overflow = 'hidden';
  } else if (mode === 'monthWithYear') {
    overflow = 'hidden';
  }
  return overflow;
};

const calcLocale = (mode: PickMode, account: UserAccount) => {
  const timeFormat = account.info.timeFormat;
  let locale = account.info.language.toLowerCase();
  if (mode === 'monthWithYear' && locale.startsWith('en')) {
    locale = 'en_GB';
  } else if (mode === 'time') {
    locale = timeFormat === 'H12' ? 'en_US' : 'en_GB';
  }
  return locale;
};

const DateTimePicker = ({value, setValue, mode, minDate, maxDate}: DateTimePickerProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const theme = useTheme();
  const initialValue = value || minDate || DateUtils.addMinutes(new Date(), 20);

  const pickerMode = calcMode(mode);
  const width = calcWidth(mode);
  const marginLeft = calcMarginLeft(mode);
  const overflow = calcOverflow(mode);
  const localeMode = calcLocale(mode, account);

  useEffect(() => {
    setValue(initialValue);
  }, []);

  const textColor = useColorModeValue(theme.colors.gray['600'], theme.colors.gray['300']);

  return (
    <Box width={width} overflow={overflow}>
      <Box ml={marginLeft}>
        <DatePicker
          date={value || initialValue}
          onDateChange={setValue}
          mode={pickerMode}
          locale={localeMode}
          is24hourSource="locale"
          textColor={textColor}
          fadeToColor="none"
          minimumDate={minDate}
          maximumDate={maxDate}
        />
      </Box>
    </Box>
  );
};

export default DateTimePicker;
