import React, {ComponentType, memo} from 'react';
import {Platform, StyleProp, ViewStyle} from 'react-native';
import {KeyboardAvoidingView} from 'native-base';
import {flowRight} from 'lodash';

const withKeyboardAvoiding = (Component: ComponentType) => (props: any) => {
  const behavior = Platform.OS === 'ios' ? 'padding' : undefined;

  return (
    <KeyboardAvoidingView behavior={behavior} style={styles}>
      <Component {...props} />
    </KeyboardAvoidingView>
  );
};

const styles: StyleProp<ViewStyle> = {
  flex: 1,
};

export default flowRight([memo, withKeyboardAvoiding]);
