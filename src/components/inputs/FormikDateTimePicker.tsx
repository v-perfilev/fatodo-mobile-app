import React, {useState} from 'react';
import {FormControl, IFormControlProps} from 'native-base';
import {FormikProps} from 'formik';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import PressableButton from '../controls/PressableButton';
import {DateFormatters} from '../../shared/utils/DateUtils';
import ClearableTextInput from './ClearableTextInput';

type FormikDateTimePickerProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    mode: 'date' | 'time';
    is24Hour?: boolean;
  };

const FormikDateTimePicker = (props: FormikDateTimePickerProps) => {
  const {mode, is24Hour} = props;
  const {name, label} = props;
  const {values, errors, touched, handleBlur, setFieldValue} = props;
  const [show, setShow] = useState<boolean>(false);

  const formatter = mode === 'date' ? DateFormatters.formatDateWithYear : DateFormatters.formatTime;

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  const openPicker = (): void => {
    setShow(true);
  };

  const handleInputChange = (text: string): void => {
    if (!text) {
      setFieldValue(name, null);
    }
  };

  const handlePickerChange = (_: DateTimePickerEvent, date: Date): void => {
    setShow(false);
    setFieldValue(name, date);
  };

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

      {show && <DateTimePicker value={value} onChange={handlePickerChange} mode={mode} is24Hour={is24Hour} />}

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default FormikDateTimePicker;
