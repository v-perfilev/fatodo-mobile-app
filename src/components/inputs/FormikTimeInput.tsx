import React, {useEffect, useState} from 'react';
import {FormControl, IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import DateTimePicker, {DateTimePickerEvent} from '@react-native-community/datetimepicker';
import PressableButton from '../controls/PressableButton';
import {DateFormatters} from '../../shared/utils/DateUtils';

type FormikTimeInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTimeInput = (props: FormikTimeInputProps) => {
  const {name, label} = props;
  const {values, errors, touched, handleChange, handleBlur} = props;
  const [current, setCurrent] = useState<Date>();
  const [show, setShow] = useState<boolean>(false);

  const value = values[name];
  const isTouched = name in touched;
  const isError = name in errors;

  const openPicker = (): void => {
    setShow(true);
  };

  const handlePickerChange = (_: DateTimePickerEvent, date: Date): void => {
    setShow(false);
    setCurrent(date);
  };

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  return (
    <FormControl isInvalid={isTouched && isError} {...props}>
      {label && <FormControl.Label>{label}</FormControl.Label>}

      <PressableButton onPress={openPicker}>
        <Input
          type="text"
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={DateFormatters.formatTime(current)}
          editable={false}
        />
      </PressableButton>

      {show && <DateTimePicker mode="time" is24Hour value={current} onChange={handlePickerChange} />}

      {isTouched && <FormControl.ErrorMessage>{errors[name]}</FormControl.ErrorMessage>}
    </FormControl>
  );
};
export default FormikTimeInput;
