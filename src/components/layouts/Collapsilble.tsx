import React, {PropsWithChildren, useEffect, useState} from 'react';
import {LayoutAnimation, Platform, StyleProp, UIManager, ViewStyle} from 'react-native';
import {View} from 'native-base';

type CollapsibleProps = PropsWithChildren<{
  show: boolean;
}>;

const Collapsible = ({show, children}: CollapsibleProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(!show);

  useEffect(() => {
    Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental(true);
  }, []);

  useEffect(() => {
    if (collapsed === show) {
      const config = {...LayoutAnimation.Presets.easeInEaseOut, duration: 250};
      LayoutAnimation.configureNext(config);
      setCollapsed(!show);
    }
  }, [show]);

  const style: StyleProp<ViewStyle> = {height: collapsed ? 0 : undefined, overflow: 'hidden'};

  return <View style={style}>{children}</View>;
};

export default Collapsible;
