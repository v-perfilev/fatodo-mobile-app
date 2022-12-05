import React, {memo} from 'react';
import {FormControl, Switch} from 'native-base';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';
import FHStack from '../boxes/FHStack';
import {Platform} from 'react-native';

type FormikSwitchInputProps = FormikInputProps;

const FormikSwitchInput = (props: FormikSwitchInputProps) => {
  const {label, value, error, isTouched, isError, isDisabled, setValue} = props;

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      <FHStack space={1} alignItems="center">
        {label && <FormControl.Label>{label}</FormControl.Label>}
        <Switch
          size={Platform.OS === 'android' ? 'md' : 'sm'}
          isChecked={value}
          isDisabled={isDisabled}
          onValueChange={setValue}
        />
      </FHStack>
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([memo, withFormikWrapper])(FormikSwitchInput);
