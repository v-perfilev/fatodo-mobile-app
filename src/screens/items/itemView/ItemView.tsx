import React, {useEffect, useMemo} from 'react';
import {Divider, Theme} from 'native-base';
import ThemeProvider from '../../../components/layouts/ThemeProvider';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import {ThemeFactory} from '../../../shared/themes/ThemeFactory';
import ItemViewHeader from './ItemViewHeader';
import ItemViewDescription from './ItemViewDescription';
import ItemViewTags from './ItemViewTags';
import ItemViewChanges from './ItemViewChanges';
import ItemViewDate from './itemViewDate';
import ItemViewPriority from './itemViewPriority';
import ItemViewType from './itemViewType';
import ItemViewGroup from './itemViewGroup';
import ItemReminders from './ItemReminders';
import ItemViewName from './itemViewName';
import FScrollView from '../../../components/boxes/FScrollView';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import ItemSelectors from '../../../store/item/itemSelectors';
import {UsersThunks} from '../../../store/users/usersActions';
import withItemContainer, {WithItemProps} from '../../../shared/hocs/withContainers/withItemContainer';

type ItemViewProps = WithItemProps;

const ItemView = ({group, item, loading}: ItemViewProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const reminders = useAppSelector(ItemSelectors.reminders);

  const showTags = item?.tags.length > 0;
  const showReminders = reminders?.length > 0;
  const showDividerAfterDescription = showTags || showReminders;

  useEffect(() => {
    if (item) {
      const userIds = [item.createdBy, item.lastModifiedBy];
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [item]);

  useEffect(() => {
    if (group) {
      const userIds = group.members.map((user) => user.id);
      dispatch(UsersThunks.handleUserIds(userIds));
    }
  }, [group]);

  const theme = useMemo<Theme>(() => {
    return group ? ThemeFactory.getTheme(group?.color) : ThemeFactory.getDefaultTheme();
  }, [group]);

  return (
    <ThemeProvider theme={theme}>
      <ItemViewHeader account={account} />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <ItemViewName />
            <ItemViewGroup />
            <FHStack defaultSpace>
              <ItemViewType />
              <ItemViewPriority />
            </FHStack>
            <ItemViewDate />
            <Divider bg="secondary.500" />
            <ItemViewDescription />
            {showDividerAfterDescription && <Divider bg="secondary.500" />}
            {showReminders && <ItemReminders />}
            {showTags && <ItemViewTags />}
            <Divider bg="secondary.500" />
            <ItemViewChanges />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </ThemeProvider>
  );
};

export default withItemContainer(ItemView);
