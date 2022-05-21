import React, {useState} from 'react';
import {Flex, FormControl, IFormControlProps, useTheme} from 'native-base';
import {FormikProps} from 'formik';
import PressableButton from '../controls/PressableButton';
import {DateFormatters, DateUtils} from '../../shared/utils/DateUtils';
import ClearableTextInput from './ClearableTextInput';
import DatePicker from 'react-native-date-picker';
import ConfirmationDialog from '../modals/ConfirmationDialog';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';

type FormikDateTimePickerProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    mode: 'date' | 'time';
  };

const FormikDateTimePicker = (props: FormikDateTimePickerProps) => {
  const {name, label, mode} = props;
  const {values, errors, touched, handleBlur, setFieldValue} = props;
  const account = useAppSelector(AuthSelectors.accountSelector);
  const theme = useTheme();
  const [show, setShow] = useState<boolean>(false);
  const [pickerValue, setPickerValue] = useState<Date>();

  const initialValue = DateUtils.addMinutes(new Date(), 20);

  const formatter = mode === 'date' ? DateFormatters.formatDateWithYear : DateFormatters.formatTime;

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;
  const locale = account.info.language;

  const openPicker = (): void => setShow(true);
  const closePicker = (): void => setShow(false);

  const handleInputChange = (text: string): void => {
    if (!text) {
      setFieldValue(name, null);
    }
  };

  const handlePickerChange = (date: Date): void => {
    setPickerValue(date);
  };

  const onAgree = (): void => {
    setFieldValue(name, pickerValue || initialValue);
    closePicker();
  };

  const onDisagree = (): void => {
    closePicker();
  };

  const picker = (
    <Flex alignItems="center">
      <DatePicker
        date={value || initialValue}
        onDateChange={handlePickerChange}
        mode={mode}
        locale={locale}
        is24hourSource="locale"
        textColor={theme.colors.primary['700']}
        fadeToColor="none"
      />
    </Flex>
  );

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <PressableButton onPress={openPicker}>
        <ClearableTextInput
          type="text"
          onChangeText={handleInputChange}
          onBlur={handleBlur(name)}
          value={value ? formatter(value) : undefined}
          editable={false}
        />
      </PressableButton>

      <ConfirmationDialog open={show} onAgree={onAgree} onDisagree={onDisagree} title={label} content={picker} />

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default FormikDateTimePicker;
