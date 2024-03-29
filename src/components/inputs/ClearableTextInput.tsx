import React, {useEffect, useState} from 'react';
import {GestureResponderEvent, Platform} from 'react-native';
import {IInputProps, Input, useColorMode} from 'native-base';
import CloseIcon from '../icons/CloseIcon';
import IconButton from '../controls/IconButton';

type ClearableTextInputProps = IInputProps & {
  isErrorColor?: boolean;
};

const ClearableTextInput = ({value, onChangeText, isErrorColor, ...props}: ClearableTextInputProps) => {
  const {colorMode} = useColorMode();
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
      _focus={{
        borderColor: isErrorColor ? 'error.500' : undefined,
        backgroundColor: isErrorColor ? 'error.500:alpha.10' : undefined,
      }}
      type="text"
      autoCapitalize="none"
      keyboardAppearance={colorMode}
      onChangeText={handleChangeText}
      value={updater}
      InputRightElement={
        showClearButton && (
          <IconButton
            colorScheme={isErrorColor ? 'error' : undefined}
            size={Platform.OS === 'ios' ? 'md' : 'sm'}
            p="1"
            ml="2"
            icon={<CloseIcon />}
            onPress={clear}
          />
        )
      }
    />
  );
};

export default ClearableTextInput;
