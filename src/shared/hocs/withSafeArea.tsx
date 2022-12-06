import React, {ComponentType, memo, useEffect, useState} from 'react';
import {flowRight} from 'lodash';
import FBox from '../../components/boxes/FBox';
import {Keyboard, Platform} from 'react-native';

const withSafeArea = (Component: ComponentType) => (props: any) => {
  const [keyboardOpen, setKeyboardOpen] = useState<boolean>();
  const safeAreaBottom = Platform.OS === 'ios' ? (keyboardOpen ? 0 : 5) : true;

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <FBox safeAreaTop safeAreaLeft safeAreaRight safeAreaBottom={safeAreaBottom}>
      <Component {...props} />
    </FBox>
  );
};

export default flowRight([memo, withSafeArea]);
