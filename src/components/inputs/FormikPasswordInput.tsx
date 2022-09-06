import React, {memo, useState} from 'react';
import {FormControl, Input} from 'native-base';
import VisibleOffIcon from '../icons/VisibleOffIcon';
import {GestureResponderEvent} from 'react-native';
import VisibleOnIcon from '../icons/VisibleOnIcon';
import {INPUT_FONT_SIZE} from '../../constants';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';

type FormikPasswordInputProps = FormikInputProps;

const FormikPasswordInput = (props: FormikPasswordInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (e: GestureResponderEvent): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  const InputRightElement = showPassword ? (
    <VisibleOffIcon color="gray.300" size="md" mx="2" onPress={toggleShowPassword} />
  ) : (
    <VisibleOnIcon color="gray.300" size="md" mx="2" onPress={toggleShowPassword} />
  );

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type={showPassword ? 'text' : 'password'}
        autoCapitalize="none"
        placeholder={placeholder}
        fontSize={INPUT_FONT_SIZE}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        InputRightElement={InputRightElement}
      />
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight(withFormikWrapper, memo)(FormikPasswordInput);
