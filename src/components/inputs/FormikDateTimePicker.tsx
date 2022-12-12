import React, {useMemo, useState} from 'react';
import {Flex, FormControl, IFormControlProps, useColorModeValue, useTheme} from 'native-base';
import {FormikProps} from 'formik';
import {DateUtils} from '../../shared/utils/DateUtils';
import ClearableTextInput from './ClearableTextInput';
import DatePicker from 'react-native-date-picker';
import ConfirmationDialog from '../modals/ConfirmationDialog';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {UserAccount} from '../../models/User';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {Platform} from 'react-native';
import PressableButton from '../controls/PressableButton';

type FormikDateTimePickerMode = 'date' | 'time';

type FormikDateTimePickerProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    mode: FormikDateTimePickerMode;
  };

const formatValue = (date: Date, account: UserAccount, mode: FormikDateTimePickerMode): string => {
  switch (mode) {
    case 'date':
      return DateFormatters.formatDate(date, account, undefined, 'FULL');
    case 'time':
      return DateFormatters.formatDate(date, account, 'FULL');
  }
};

const calcLocale = (mode: FormikDateTimePickerMode, account: UserAccount) => {
  const locale = account.settings.language;
  const timeFormat = account.settings.timeFormat;
  if (mode === 'time') {
    return timeFormat === 'H12' ? 'en_US' : 'en_GB';
  } else {
    return locale.toLowerCase();
  }
};

const FormikDateTimePicker = (props: FormikDateTimePickerProps) => {
  const {name, label, mode} = props;
  const {values, errors, touched, handleBlur, setFieldValue} = props;
  const account = useAppSelector(AuthSelectors.account);
  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
  const [dateValue, setDateValue] = useState<Date>(values[name] || DateUtils.addMinutes(new Date(), 20));

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;
  const locale = calcLocale(mode, account);

  const formattedValue = useMemo<string>(() => {
    return value ? formatValue(value, account, mode) : undefined;
  }, [value]);

  const openPicker = (): void => setShow(true);
  const closePicker = (): void => setShow(false);

  const handleInputChange = (text: string): void => {
    if (!text) {
      setFieldValue(name, null);
    }
  };

  const handlePickerChange = (date: Date): void => {
    setDateValue(date);
  };

  const onAgree = (): void => {
    setFieldValue(name, dateValue);
    closePicker();
  };

  const onDisagree = (): void => {
    closePicker();
  };

  const textColor = useColorModeValue(theme.colors.gray['600'], theme.colors.gray['300']);
  const iosTextColor = useColorModeValue('black', 'white');

  const picker = (
    <Flex alignItems="center">
      <DatePicker
        date={dateValue}
        onDateChange={handlePickerChange}
        mode={mode}
        locale={locale}
        is24hourSource="locale"
        textColor={Platform.OS === 'android' ? textColor : iosTextColor}
        fadeToColor="none"
      />
    </Flex>
  );

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <PressableButton onPress={openPicker}>
        <ClearableTextInput
          onPressIn={openPicker}
          type="text"
          onChangeText={handleInputChange}
          onBlur={handleBlur(name)}
          value={formattedValue}
          editable={false}
        />
      </PressableButton>

      <ConfirmationDialog open={show} onAgree={onAgree} onDisagree={onDisagree} title={label} content={picker} />

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default FormikDateTimePicker;
