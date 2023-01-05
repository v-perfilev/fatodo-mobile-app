import React, {memo, ReactElement, useCallback, useEffect, useMemo, useState} from 'react';
import {FormControl, ScrollView, Text, useColorModeValue} from 'native-base';
import Menu, {MenuItem} from '../controls/Menu';
import PressableButton from '../controls/PressableButton';
import PaperBox from '../surfaces/PaperBox';
import {Dimensions, GestureResponderEvent, Keyboard, ListRenderItemInfo} from 'react-native';
import FlatList from '../scrollable/FlatList';
import withFormikWrapper, {FormikInputProps} from '../../shared/hocs/withFormikWrapper';
import {flowRight} from 'lodash';
import {INPUT_MIN_HEIGHT} from '../../constants';

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

const FormikSelectTrigger =
  (option: string | ReactElement, borderColor?: string, isDisabled?: boolean) => (triggerProps: any) => {
    const filterPropsIfDisabled = (props: any): any => (!isDisabled ? props : undefined);

    const onPress = (e: GestureResponderEvent): void => {
      Keyboard.dismiss();
      triggerProps.onPress(e);
    };

    return (
      <PressableButton {...filterPropsIfDisabled({...triggerProps, onPressIn: onPress})}>
        <PaperBox
          minHeight={`${INPUT_MIN_HEIGHT}px`}
          justifyContent="center"
          px="3"
          borderColor={borderColor}
          borderRadius="xl"
          opacity={isDisabled ? 0.5 : undefined}
        >
          {option}
        </PaperBox>
      </PressableButton>
    );
  };

const FormikSelect = (props: FormikSelectProps) => {
  const {label, options, value, error, isTouched, isError, setValue, isDisabled} = props;
  const [current, setCurrent] = useState<any>(value);
  const borderColor = useColorModeValue('gray.400', 'gray.600');

  const listHeight = useMemo<number>(() => Math.floor(Dimensions.get('window').height / 2), []);
  const data = useMemo<string[]>(() => Array.from(options.keys()), [options]);
  const renderItem = useCallback(
    (info: ListRenderItemInfo<string>): ReactElement => (
      <FormikSelectItem options={options} option={info.item} setCurrent={setCurrent} />
    ),
    [options],
  );

  const flatList = useMemo<ReactElement>(
    () => (
      <ScrollView maxHeight={listHeight} horizontal={true}>
        <FlatList
          fixedLength={40}
          data={data}
          render={renderItem}
          maxToRenderPerBatch={100}
          updateCellsBatchingPeriod={10}
          onEndReachedThreshold={4}
          notFullHeight
        />
      </ScrollView>
    ),
    [data, renderItem],
  );

  useEffect(() => {
    setValue(current);
  }, [current]);

  useEffect(() => {
    if (value !== current) {
      setCurrent(value);
    }
  }, [value]);

  return (
    <FormControl isInvalid={isTouched && isError} isDisabled={isDisabled}>
      {label && <FormControl.Label>{label}</FormControl.Label>}
      <Menu trigger={FormikSelectTrigger(options.get(current), borderColor, isDisabled)}>{flatList}</Menu>
      {isTouched && <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>}
    </FormControl>
  );
};

export default flowRight([memo, withFormikWrapper])(FormikSelect);
