import RefreshableContainer, {RefreshableContainerChildrenProps} from './containers/RefreshableContainer';
import React, {memo} from 'react';
import {Animated, ScrollViewProps, StyleProp, ViewStyle} from 'react-native';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';

type RefreshableScrollViewProps = ScrollViewProps & {
  refresh?: () => Promise<void>;
  loading?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

const flexStyle: StyleProp<ViewStyle> = {flexGrow: 1};

const RefreshableScrollView = React.forwardRef((props: RefreshableScrollViewProps, ref: any) => {
  const {refresh, loading, containerStyle, children} = props;

  return (
    <ConditionalSpinner loading={loading}>
      <RefreshableContainer refresh={refresh}>
        {({refresher, handleEventScroll}: RefreshableContainerChildrenProps) => (
          <Animated.ScrollView
            contentContainerStyle={[flexStyle, containerStyle]}
            onScroll={handleEventScroll}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={ref}
            {...props}
          >
            {refresher}
            {children}
          </Animated.ScrollView>
        )}
      </RefreshableContainer>
    </ConditionalSpinner>
  );
});

export default memo(RefreshableScrollView);
