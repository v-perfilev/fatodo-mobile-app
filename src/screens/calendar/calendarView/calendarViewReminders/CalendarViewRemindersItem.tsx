import React, {useCallback} from 'react';
import {CalendarReminder} from '../../../../models/Reminder';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {useAppSelector} from '../../../../store/store';
import Bullet from '../../../../components/surfaces/Bullet';
import GroupLink from '../../../../components/links/GroupLink';
import ItemLink from '../../../../components/links/ItemLink';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import DateView from '../../../../components/views/DateView';
import FBox from '../../../../components/boxes/FBox';
import {useNavigation} from '@react-navigation/native';
import {TabNavigationProps} from '../../../../navigators/TabNavigator';
import PressableButton from '../../../../components/controls/PressableButton';

type CalendarViewRemindersItemProps = {
  reminder: CalendarReminder;
};

const CalendarViewRemindersItem = ({reminder}: CalendarViewRemindersItemProps) => {
  const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
  const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
  const navigation = useNavigation<TabNavigationProps>();
  const group = useAppSelector((state) => groupSelector(state, reminder.parentId));
  const item = useAppSelector((state) => itemSelector(state, reminder.targetId));

  const goToItem = (): void => navigation.navigate('Groups', {screen: 'ItemView', params: {itemId: item?.id}});

  const bulletView = <Bullet colorScheme={group?.color} size="15px" />;
  const groupView = group ? <GroupLink group={group} noLink /> : null;
  const itemView = item ? <ItemLink item={item} noLink /> : null;
  const date = new Date(reminder.date);

  return (
    <PressableButton onPress={goToItem}>
      <FHStack space="3" alignItems="center" py="1">
        <FBox grow={false} height="15px">
          {bulletView}
        </FBox>
        <FVStack grow>
          <Text color="primary.500" fontSize="md" fontWeight="bold" isTruncated>
            {itemView}
          </Text>
          <Text color="gray.400" fontSize="sm" fontWeight="bold" isTruncated>
            {groupView}
          </Text>
        </FVStack>
        <Box>
          <Text color="gray.400" fontSize="xs">
            <DateView date={date} timeFormat="FULL" />
          </Text>
        </Box>
      </FHStack>
    </PressableButton>
  );
};

export default CalendarViewRemindersItem;
