import React, {memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {FormControl, ScrollView, Text} from 'native-base';
import Menu, {MenuItem} from '../controls/Menu';
import PressableButton from '../controls/PressableButton';
import PaperBox from '../surfaces/PaperBox';
import {Dimensions, ListRenderItemInfo} from 'react-native';
import FlatList from '../scrollable/FlatList';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';

type FormikSelectProps = FormikInputProps;

type FormikSelectItemProps = {
  option: string;
  options: Map<string, string | ReactElement>;
  setCurrent: (current: string) => void;
};

const FormikSelectItem = ({option, options, setCurrent}: FormikSelectItemProps) => {
  const select = (): void => setCurrent(option);
  const content = options.get(option);
  const wrappedContent = typeof content === 'string' ? <Text>{content}</Text> : content;
  return <MenuItem action={select}>{wrappedContent}</MenuItem>;
};

const FormikSelect = (props: FormikSelectProps) => {
  const {label, options, value, error, isTouched, isError, setValue, isDisabled} = props;
  const [current, setCurrent] = useState<any>(value);

  const listHeight = useMemo<number>(() => Math.floor(Dimensions.get('window').height / 2), []);
  const data = useMemo<string[]>(() => Array.from(options.keys()), [options]);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<string>): ReactElement => (
      <FormikSelectItem options={options} option={info.item} setCurrent={setCurrent} />
    ),
    [],
  );

  const flatList = useMemo<ReactElement>(
    () => (
      <ScrollView maxHeight={listHeight} horizontal={true}>
        <FlatList fixedLength={40} data={data} render={renderItem} />
      </ScrollView>
    ),
    [data],
  );

  useEffect(() => {
    setValue(current);
  }, [current]);

  useEffect(() => {
    if (value !== current) {
      setCurrent(value);
    }
  }, [value]);

  const filterPropsIfDisabled = (props: any): any => (!isDisabled ? props : undefined);

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Menu
        trigger={(triggerProps) => (
          <PressableButton {...filterPropsIfDisabled(triggerProps)}>
            <PaperBox h="45px" justifyContent="center" px="3" opacity={isDisabled ? 0.5 : undefined}>
              {options.get(current)}
            </PaperBox>
          </PressableButton>
        )}
      >
        {flatList}
      </Menu>
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([withFormikWrapper, memo])(FormikSelect);
