import React, {ReactElement} from 'react';
import {IFormControlProps, Input} from 'native-base';
import {FormikProps} from 'formik';
import FormikChips from './FormikChips';

type FormikTagsInputProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
  };

const FormikTagsInput = (props: FormikTagsInputProps) => {
  const [input, setInput] = React.useState('');

  const handleEndEditing = (addValue: (value: string) => void, close: () => void) => (): void => {
    const trimmedInput = input.trim();
    if (trimmedInput.length > 0) {
      addValue(trimmedInput);
    }
    setInput('');
    close();
  };

  const viewElement = (value: string): ReactElement => <>{value}</>;

  const inputElement = (show: boolean, addValue: (value: string) => void, close: () => void): ReactElement =>
    show && (
      <Input
        minW="40%"
        h="30px"
        isFullWidth
        autoFocus={true}
        variant="subtle"
        value={input}
        onChangeText={setInput}
        onEndEditing={handleEndEditing(addValue, close)}
      />
    );

  return <FormikChips view={viewElement} input={inputElement} {...props} />;
};

export default FormikTagsInput;
