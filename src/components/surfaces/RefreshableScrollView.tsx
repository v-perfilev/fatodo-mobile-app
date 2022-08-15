import RefreshableContainer, {RefreshableChildrenProps} from './RefreshableContainer';
import {RefUtils} from '../../shared/utils/RefUtils';
import React, {ReactNode} from 'react';
import Refresher from './Refresher';
import {Animated, ScrollViewProps} from 'react-native';
import {ListUtils} from '../../shared/utils/ListUtils';

type RefreshableScrollViewProps = ScrollViewProps & {
  refresh?: () => Promise<void>;
  children?: ReactNode;
};

const RefreshableScrollView = React.forwardRef((props: RefreshableScrollViewProps, ref: any) => {
  const {refresh, children} = props;

  return (
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
          <Refresher paddingTop={extraScrollY} refreshing={refreshing} />
          {children}
        </Animated.ScrollView>
      )}
    </RefreshableContainer>
  );
});

export default RefreshableScrollView;
