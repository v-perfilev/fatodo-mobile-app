import React, {memo, useState} from 'react';
import {FormControl, Input, useColorMode} from 'native-base';
import VisibleOffIcon from '../icons/VisibleOffIcon';
import {GestureResponderEvent} from 'react-native';
import VisibleOnIcon from '../icons/VisibleOnIcon';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';
import IconButton from '../controls/IconButton';

type FormikPasswordInputProps = FormikInputProps;

const FormikPasswordInput = (props: FormikPasswordInputProps) => {
  const {label, placeholder, value, error, isTouched, isError, isDisabled, onChange, onBlur} = props;
  const {colorMode} = useColorMode();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const toggleShowPassword = (e: GestureResponderEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword((prevState) => !prevState);
  };

  const InputRightElement = showPassword ? (
    <IconButton size="md" mx="2" onPress={toggleShowPassword} icon={<VisibleOffIcon />} />
  ) : (
    <IconButton size="md" mx="2" onPress={toggleShowPassword} icon={<VisibleOnIcon />} />
  );

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Input
        type={showPassword ? 'text' : 'password'}
        autoCapitalize="none"
        placeholder={placeholder}
        keyboardAppearance={colorMode}
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
