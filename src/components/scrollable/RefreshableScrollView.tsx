import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {memo, ReactNode} from 'react';
import Refresher from './Refresher';
import {Animated, ScrollViewProps} from 'react-native';
import {ListUtils} from '../../shared/utils/ListUtils';
import ConditionalSpinner from '../surfaces/ConditionalSpinner';

type RefreshableScrollViewProps = ScrollViewProps & {
  refresh?: () => Promise<void>;
  loading?: boolean;
  children?: ReactNode;
};

const RefreshableScrollView = React.forwardRef((props: RefreshableScrollViewProps, ref: any) => {
  const {refresh, loading, children} = props;

  return (
    <ConditionalSpinner loading={loading}>
      <RefreshableContainer refresh={refresh}>
        {({handleEventScroll, extraScrollY, refreshing, refreshableRef}: RefreshableChildrenProps) => (
          <Animated.ScrollView
            contentContainerStyle={ListUtils.containerStyle()}
            onScroll={handleEventScroll}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ref={RefUtils.merge(ref, refreshableRef)}
            {...props}
          >
            <Refresher extraScrollY={extraScrollY} refreshing={refreshing} />
            {children}
          </Animated.ScrollView>
        )}
      </RefreshableContainer>
    </ConditionalSpinner>
  );
});

export default memo(RefreshableScrollView);
