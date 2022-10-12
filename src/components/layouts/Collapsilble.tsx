import React, {PropsWithChildren, useEffect, useState} from 'react';
import {LayoutAnimation, Platform, UIManager} from 'react-native';
import FBox from '../boxes/FBox';

type CollapsibleProps = PropsWithChildren<{
  show: boolean;
}>;

const Collapsible = ({show, children}: CollapsibleProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    const animationConfig = {...LayoutAnimation.Presets.easeInEaseOut, duration: 250};
    LayoutAnimation.configureNext(animationConfig);
    setCollapsed(!show);
  }, [show]);

  return (
    <FBox overflow="hidden" height={collapsed ? 0 : undefined}>
      {children}
    </FBox>
  );
};

export default Collapsible;
