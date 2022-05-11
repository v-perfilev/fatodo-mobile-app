import React, {useEffect, useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import {Icon, IInputProps, Input} from 'native-base';
import CloseIcon from '../icons/CloseIcon';

const ClearableTextInput = ({onChangeText, ...props}: IInputProps) => {
  const [text, setText] = useState<string>();
  const [textToUpdate, setTextToUpdate] = useState<string>(undefined);
  const [showClearButton, setShowClearButton] = useState<boolean>(false);

  const updateShowClearButton = (): void => {
    const filterIsNotEmpty = text?.length > 0;
    setShowClearButton(filterIsNotEmpty);
  };

  const clear = (event: GestureResponderEvent): void => {
    event.stopPropagation();
    setText('');
    setTextToUpdate('');
  };

  const handleOnChange = (newTextValue: string): void => {
    onChangeText(newTextValue);
    setText(newTextValue);
  };

  useEffect(() => {
    updateShowClearButton();
    setTextToUpdate(undefined);
  }, [text]);

  return (
    <Input
      {...props}
      type="text"
      autoCapitalize="none"
      onChangeText={handleOnChange}
      value={textToUpdate}
      InputRightElement={showClearButton && <Icon as={<CloseIcon />} size="4" mx="2" onPress={clear} />}
    />
  );
};

export default ClearableTextInput;
