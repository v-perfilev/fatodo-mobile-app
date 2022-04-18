import React, {FC, memo, useMemo} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {ThemeFactory} from '../../../../shared/themes/ThemeFactory';
import {flowRight} from 'lodash';
import {Box} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import {Group} from '../../../../models/Group';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import {Item} from '../../../../models/Item';
import GroupListCardContent from './GroupListCardContent';

type GroupListCardProps = {
  group: Group;
  items: Item[];
  count: number;
  loading: boolean;
  collapsed: boolean;
  drag: () => void;
  sorting: boolean;
};

const GroupListCard: FC<GroupListCardProps> = ({items, count, loading, collapsed, sorting, drag}) => {
  const {group} = useGroupViewContext();

  const theme = useMemo(() => ThemeFactory.getTheme(group?.color), [group]);

  return (
    <ThemeProvider theme={theme}>
      <Box borderRadius="4" mb="1" mx="1" overflow="hidden">
        <GroupListCardHeader sorting={sorting} drag={drag} />
        <Collapsible collapsed={collapsed}>
          <GroupListCardContent items={items} count={count} loading={loading} />
        </Collapsible>
      </Box>
    </ThemeProvider>
  );
};

export default flowRight([memo])(GroupListCard);
