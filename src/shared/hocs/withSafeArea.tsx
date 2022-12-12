import React, {ComponentType, memo} from 'react';
import {flowRight} from 'lodash';
import FBox from '../../components/boxes/FBox';
import {Platform} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const withSafeArea = (Component: ComponentType) => (props: any) => {
  const safeAreaBottom = Platform.OS === 'ios' ? 5 : true;

  return (
    <SafeAreaProvider>
      <FBox safeAreaTop safeAreaLeft safeAreaRight safeAreaBottom={safeAreaBottom}>
        <Component {...props} />
      </FBox>
    </SafeAreaProvider>
  );
};

export default flowRight([memo, withSafeArea]);
