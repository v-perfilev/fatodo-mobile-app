import React, {ComponentType, memo} from 'react';
import {flowRight} from 'lodash';
import FBox from '../../components/boxes/FBox';
import {Platform} from 'react-native';

const withSafeArea = (Component: ComponentType) => (props: any) => {
  const safeAreaBottom = Platform.OS === 'ios' ? 5 : true;

  return (
    <FBox safeAreaTop safeAreaLeft safeAreaRight safeAreaBottom={safeAreaBottom}>
      <Component {...props} />
    </FBox>
  );
};

export default flowRight([memo, withSafeArea]);
