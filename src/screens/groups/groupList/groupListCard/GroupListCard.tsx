import React, {memo, useCallback} from 'react';
import {Box, IBoxProps} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import GroupListCardContent from './GroupListCardContent';
import {Group} from '../../../../models/Group';
import {useAppSelector} from '../../../../store/store';
import GroupsSelectors from '../../../../store/groups/groupsSelectors';
import Collapsible from '../../../../components/layouts/Collapsilble';
import withThemeProvider from '../../../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';

type GroupListCardProps = IBoxProps & {
  group: Group;
  sorting: boolean;
  drag: () => void;
};

const GroupListCard = ({group, sorting, drag, ...props}: GroupListCardProps) => {
  const itemsSelector = useCallback(GroupsSelectors.makeItemsSelector(), []);
  const itemsCountSelector = useCallback(GroupsSelectors.makeItemsCountSelector(), []);
  const itemsCollapsedSelector = useCallback(GroupsSelectors.makeItemsCollapsedSelector(), []);
  const itemsLoadingSelector = useCallback(GroupsSelectors.makeItemsLoadingSelector(), []);
  const items = useAppSelector((state) => itemsSelector(state, group.id));
  const itemsCount = useAppSelector((state) => itemsCountSelector(state, group.id));
  const collapsed = useAppSelector((state) => itemsCollapsedSelector(state, group.id));
  const loading = useAppSelector((state) => itemsLoadingSelector(state, group.id));

  return (
    <Box overflow="hidden" py="1" {...props}>
      <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
      <Collapsible show={!collapsed && !sorting}>
        <GroupListCardContent group={group} items={items} itemsCount={itemsCount} loading={loading} />
      </Collapsible>
    </Box>
  );
};

export default flowRight([withThemeProvider, memo])(GroupListCard);
