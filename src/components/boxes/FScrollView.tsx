import React, {useState} from 'react';
import {Flex, IScrollViewProps, ScrollView, useTheme} from 'native-base';
import {DEFAULT_SPACE} from '../../constants';
import {RefreshControl} from 'react-native';

const containerStyle = {flexGrow: 1};

type FScrollViewProps = IScrollViewProps & {
  refresh?: () => Promise<void>;
};

const FScrollView = ({refresh, children, p = DEFAULT_SPACE, px, py, pt, pr, pb, pl, ...props}: FScrollViewProps) => {
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
      _contentContainerStyle={containerStyle}
      {...props}
      showsVerticalScrollIndicator={false}
    >
      <Flex flex="1" m={p} mx={px} my={py} mt={pt} mr={pr} mb={pb} ml={pl}>
        {children}
      </Flex>
    </ScrollView>
  );
};

export default FScrollView;
