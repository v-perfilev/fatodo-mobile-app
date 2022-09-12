import React, {memo, useCallback} from 'react';
import {Box, IBoxProps} from 'native-base';
import GroupListCardHeader from './GroupListCardHeader';
import Collapsible from 'react-native-collapsible';
import ThemeProvider from '../../../../components/layouts/ThemeProvider';
import GroupListCardContent from './GroupListCardContent';
import {Group} from '../../../../models/Group';
import {ThemeFactory} from '../../../../shared/themes/ThemeFactory';
import {useAppSelector} from '../../../../store/store';
import GroupsSelectors from '../../../../store/groups/groupsSelectors';

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
  const count = useAppSelector((state) => itemsCountSelector(state, group.id));
  const collapsed = useAppSelector((state) => itemsCollapsedSelector(state, group.id));
  const loading = useAppSelector((state) => itemsLoadingSelector(state, group.id));

  const theme = ThemeFactory.getTheme(group.color);

  return (
    <Box py="1" {...props}>
      <ThemeProvider theme={theme}>
        <GroupListCardHeader group={group} collapsed={collapsed} sorting={sorting} drag={drag} />
        <Collapsible collapsed={collapsed}>
          <GroupListCardContent group={group} items={items} count={count} loading={loading} />
        </Collapsible>
      </ThemeProvider>
    </Box>
  );
};

export default memo(GroupListCard);
