import React, {ComponentType, ReactElement, useCallback, useMemo} from 'react';
import {FormikProps} from 'formik';
import {IFormControlProps} from 'native-base';

type WithFormikWrapperProps = IFormControlProps &
  FormikProps<any> & {
    name: string;
    label?: string;
    options?: Map<string, string | ReactElement>;
    placeholder?: string;
  };

export type FormikInputProps = {
  name: string;
  label?: string;
  options?: Map<string, string | ReactElement>;
  placeholder?: string;
  value: any;
  error: any;
  isTouched: boolean;
  isError: boolean;
  setValue: (value: any) => void;
  onChange: (value: any) => void;
  onBlur: (value: any) => void;
  isDisabled: boolean;
};

const withFormikWrapper =
  (Component: ComponentType<FormikInputProps>) =>
  (props: WithFormikWrapperProps): ReactElement => {
    const {name, values, errors, touched, setFieldValue, handleChange, handleBlur, isDisabled, label, options} = props;

    const value = useMemo(() => values[name], [values]);
    const error = useMemo(() => errors[name], [errors]);
    const isTouched = useMemo(() => name in touched, [touched]);
    const isError = useMemo(() => name in errors, [errors]);
    const setValue = useCallback((value: any): void => setFieldValue(name, value), [setFieldValue]);
    const onChange = useCallback(handleChange(name), [handleChange]);
    const onBlur = useCallback(handleBlur(name), [handleBlur]);

    const componentProps: FormikInputProps = {
      name,
      value,
      error,
      isTouched,
      isError,
      setValue,
      onChange,
      onBlur,
      label,
      options,
      isDisabled,
    };

    return <Component {...componentProps} />;
  };

export default withFormikWrapper;
