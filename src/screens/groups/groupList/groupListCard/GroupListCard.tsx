import React, {memo, useEffect} from 'react';
import {Box} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import {Item} from '../../../../models/Item';
import GroupListCardContent from './GroupListCardContent';
import {Theme} from 'native-base/src/theme';
import {flowRight} from 'lodash';
import {Group} from '../../../../models/Group';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';

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
  const {group, items, count, loading: itemsLoading, collapsed, sorting, drag, theme} = props;
  const [loading, setLoading] = useDelayedState();

  useEffect(() => {
    setLoading(true);
  }, []);

  useEffect(() => {
    setLoading(itemsLoading);
  }, [itemsLoading]);

  return (
    <ThemeProvider theme={theme}>
      <Box borderRadius="4" overflow="hidden">
        <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
        <Box bg="white" borderWidth="1" borderTopWidth="0" borderColor="gray.200" borderBottomRadius="3">
          <Collapsible collapsed={collapsed}>
            <GroupListCardContent group={group} items={items} count={count} loading={loading} />
          </Collapsible>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([memo])(GroupListCard);
