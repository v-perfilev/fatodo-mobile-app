import React, {useState} from 'react';
import {Flex, IScrollViewProps, ScrollView, useTheme} from 'native-base';
import {DEFAULT_SPACE} from '../../constants';
import {RefreshControl} from 'react-native';
import {ListUtils} from '../../shared/utils/ListUtils';

type FScrollViewProps = IScrollViewProps & {
  refresh?: () => Promise<void>;
};

const FScrollView = React.forwardRef((props: FScrollViewProps, ref: any) => {
  const {refresh, children, p = DEFAULT_SPACE, px, py, pt, pr, pb, pl, ...otherProps} = props;
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const _onRefresh = (): void => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  };

  const _refreshControl = (
    <RefreshControl colors={[theme.colors.primary['500']]} refreshing={refreshing} onRefresh={_onRefresh} />
  );

  return (
    <ScrollView
      refreshControl={refresh ? _refreshControl : null}
      _contentContainerStyle={ListUtils.containerStyle()}
      showsVerticalScrollIndicator={false}
      ref={ref}
      {...otherProps}
    >
      <Flex flex="1" m={p} mx={px} my={py} mt={pt} mr={pr} mb={pb} ml={pl}>
        {children}
      </Flex>
    </ScrollView>
  );
});

export default FScrollView;
