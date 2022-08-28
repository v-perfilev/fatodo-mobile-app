import {IScrollViewProps, ScrollView} from 'native-base';
import {ListUtils} from '../../shared/utils/ListUtils';
import {DEFAULT_SPACE} from '../../constants';
import React from 'react';

type SimpleScrollViewProps = IScrollViewProps;

const SimpleScrollView = ({children, ...props}: SimpleScrollViewProps) => {
  return (
    <ScrollView
      contentContainerStyle={ListUtils.containerStyle(DEFAULT_SPACE)}
      keyboardShouldPersistTaps="handled"
      {...props}
    >
      {children}
    </ScrollView>
  );
};

export default SimpleScrollView;
