import React, {ComponentType} from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {KeyboardAvoidingView, useColorMode} from 'native-base';
import {DARK_BG, LIGHT_BG} from '../themes/colors';

const withKeyboardAvoiding =
  (offset = 0) =>
  (Component: ComponentType) =>
  (props: any) => {
    const {colorMode} = useColorMode();

    const backgroundColor = colorMode === 'light' ? LIGHT_BG : DARK_BG;
    const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

    return (
      <KeyboardAvoidingView behavior={behavior} keyboardVerticalOffset={offset} style={styles(backgroundColor)}>
        <Component {...props} />
      </KeyboardAvoidingView>
    );
  };

const styles = (backgroundColor: string): StyleProp<ViewStyle> => ({
  flex: 1,
  backgroundColor,
});

export default withKeyboardAvoiding;
