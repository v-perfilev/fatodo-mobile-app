import React, {ComponentType} from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleProp} from 'react-native';

const withGestureHandler = (Component: ComponentType) => (props: any) => {
  const style: StyleProp<any> = {flex: 1};

  return (
    <GestureHandlerRootView style={style}>
      <Component {...props} />
    </GestureHandlerRootView>
  );
};

export default withGestureHandler;
