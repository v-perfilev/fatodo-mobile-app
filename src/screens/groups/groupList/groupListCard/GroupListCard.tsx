import React, {memo, useEffect} from 'react';
import {Box, IBoxProps} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import {Item} from '../../../../models/Item';
import GroupListCardContent from './GroupListCardContent';
import {Group} from '../../../../models/Group';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';
import {ThemeFactory} from '../../../../shared/themes/ThemeFactory';

type GroupListCardProps = IBoxProps & {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
};

const GroupListCard = ({group, items, count, loading, collapsed, sorting, drag, ...props}: GroupListCardProps) => {
  const [initialLoading, setInitialLoading] = useDelayedState();

  const theme = ThemeFactory.getTheme(group.color);

  useEffect(() => {
    setInitialLoading(true);
  }, []);

  useEffect(() => {
    setInitialLoading(loading);
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <Box {...props}>
        <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
        <Collapsible collapsed={collapsed}>
          <GroupListCardContent group={group} items={items} count={count} loading={initialLoading} />
        </Collapsible>
      </Box>
    </ThemeProvider>
  );
};

export default memo(GroupListCard);
