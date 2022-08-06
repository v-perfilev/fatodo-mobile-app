import React, {PropsWithChildren, useState} from 'react';
import {ScrollView, useTheme} from 'native-base';
import {RefreshControl} from 'react-native';

type RefreshableViewProps = PropsWithChildren<{
  refresh?: () => Promise<void>;
}>;

const RefreshableView = ({refresh, children}: RefreshableViewProps) => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const _onRefresh = (): void => {
    setRefreshing(true);
    refresh().finally(() => setRefreshing(false));
  };

  const _refreshControl = (
    <RefreshControl colors={[theme.colors.primary['500']]} refreshing={refreshing} onRefresh={_onRefresh} />
  );

  return <ScrollView refreshControl={refresh ? _refreshControl : null}>{children}</ScrollView>;
};

export default RefreshableView;
