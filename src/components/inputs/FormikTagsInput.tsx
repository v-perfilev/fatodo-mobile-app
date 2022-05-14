import React, {ReactElement} from 'react';
import {Box, IFormControlProps, Input} from 'native-base';
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

  const inputElement = (addValue: (value: string) => void, close: () => void): ReactElement => (
    <Box flex="1" minW="30%">
      <Input
        h="30"
        isFullWidth
        autoFocus={true}
        variant="subtle"
        value={input}
        onChangeText={setInput}
        onEndEditing={handleEndEditing(addValue, close)}
      />
    </Box>
  );

  return <FormikChips view={viewElement} input={inputElement} {...props} />;
};

export default FormikTagsInput;
