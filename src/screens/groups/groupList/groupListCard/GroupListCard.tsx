import React, {memo, useEffect} from 'react';
import {Box, IBoxProps} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import {Item} from '../../../../models/Item';
import GroupListCardContent from './GroupListCardContent';
import {Theme} from 'native-base/src/theme';
import {flowRight} from 'lodash';
import {Group} from '../../../../models/Group';
import {useDelayedState} from '../../../../shared/hooks/useDelayedState';

type GroupListCardProps = IBoxProps & {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
  collapsed: boolean;
  sorting: boolean;
  drag: () => void;
  theme: Theme;
};

// TODO reduce props
const GroupListCard = ({
  group,
  items,
  count,
  loading,
  collapsed,
  sorting,
  drag,
  theme,
  ...props
}: GroupListCardProps) => {
  const [initialLoading, setInitialLoading] = useDelayedState();

  useEffect(() => {
    setInitialLoading(true);
  }, []);

  useEffect(() => {
    setInitialLoading(loading);
  }, [loading]);

  return (
    <ThemeProvider theme={theme}>
      <Box borderRadius="4" overflow="hidden" {...props}>
        <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
        <Box bg="white" borderWidth="1" borderTopWidth="0" borderColor="gray.200" borderBottomRadius="3">
          <Collapsible collapsed={collapsed}>
            <GroupListCardContent group={group} items={items} count={count} loading={initialLoading} />
          </Collapsible>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([memo])(GroupListCard);
