import React, {useCallback} from 'react';
import {CalendarReminder} from '../../src/models/Reminder';
import GroupLink from '../../src/components/links/GroupLink';
import ItemLink from '../../src/components/links/ItemLink';
import {useAppSelector} from '../../src/store/store';
import InfoSelectors from '../../src/store/info/infoSelectors';
import FHStack from '../../src/components/boxes/FHStack';
import {Box, Text} from 'native-base';
import FVStack from '../../src/components/boxes/FVStack';
import Bullet from '../../src/components/surfaces/Bullet';
import FCenter from '../../src/components/boxes/FCenter';
import DateView from '../../src/components/views/DateView';

type CalendarViewReminderItemProps = {
  reminder: CalendarReminder;
};

const CalendarViewReminderItem = ({reminder}: CalendarViewReminderItemProps) => {
  const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
  const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
  const group = useAppSelector((state) => groupSelector(state, reminder.parentId));
  const item = useAppSelector((state) => itemSelector(state, reminder.targetId));

  const bulletView = <Bullet color={group?.color} size="15px" />;
  const groupView = group ? <GroupLink group={group} color="gray.400" /> : null;
  const itemView = item ? <ItemLink item={item} /> : null;
  const date = new Date(reminder.date);

  return (
    <FHStack grow defaultSpace alignItems="center">
      <Box>
        <FCenter justifyContent="center" alignItems="center">
          {bulletView}
        </FCenter>
      </Box>
      <FVStack grow>
        <Text fontSize="16" fontWeight="bold" isTruncated>
          {itemView}
        </Text>
        <Text fontSize="14" fontWeight="bold" isTruncated>
          {groupView}
        </Text>
      </FVStack>
      <Box>
        <Text color="gray.500" fontSize="xs">
          <DateView date={date} timeFormat="FULL" />
        </Text>
      </Box>
    </FHStack>
  );
};

export default CalendarViewReminderItem;
