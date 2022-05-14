import React, {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Icon, IInputProps, Input} from 'native-base';
import CloseIcon from '../icons/CloseIcon';

const ClearableTextInput = ({value, onChangeText, ...props}: IInputProps) => {
  const [updater, setUpdater] = useState<string>(value);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  const updateShowClearButton = (text: string): void => {
    const valueIsNotEmpty = text?.length > 0;
    setShowClearButton(valueIsNotEmpty);
  };

  const clear = (event: GestureResponderEvent): void => {
    event.preventDefault();
    event.stopPropagation();
    onChangeText(undefined);
    setUpdater('');
    updateShowClearButton('');
  };

  const handleChangeText = (text: string): void => {
    onChangeText(text);
    setUpdater(undefined);
    updateShowClearButton(text);
  };

  useEffect(() => {
    setUpdater(value);
    updateShowClearButton(value);
  }, [value]);

  return (
    <Input
      {...props}
      type="text"
      autoCapitalize="none"
      onChangeText={handleChangeText}
      value={updater}
      InputRightElement={showClearButton && <Icon as={<CloseIcon />} size="4" mx="2" onPress={clear} />}
    />
  );
};

export default ClearableTextInput;
