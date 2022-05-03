import React, {memo} from 'react';
import {Box} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import {Item} from '../../../../models/Item';
import GroupListCardContent from './GroupListCardContent';
import {Theme} from 'native-base/src/theme';
import {flowRight} from 'lodash';
import {Group} from '../../../../models/Group';

type GroupListCardProps = {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
  theme: Theme;
};

const GroupListCard = (props: GroupListCardProps) => {
  const {group, items, count, loading, collapsed, sorting, drag, theme} = props;

  return (
    <ThemeProvider theme={theme}>
      <Box borderRadius="4" mb="1" mx="1" overflow="hidden">
        <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
        <Collapsible collapsed={collapsed}>
          <GroupListCardContent group={group} items={items} count={count} loading={loading} />
        </Collapsible>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([memo])(GroupListCard);
