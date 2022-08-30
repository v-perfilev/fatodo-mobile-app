import React from 'react';
import {CalendarReminder} from '../../../../models/Reminder';
import GroupLink from '../../../../components/links/GroupLink';
import ItemLink from '../../../../components/links/ItemLink';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FHStack from '../../../../components/boxes/FHStack';
import {Box, Text} from 'native-base';
import FVStack from '../../../../components/boxes/FVStack';
import Bullet from '../../../../components/surfaces/Bullet';
import FCenter from '../../../../components/boxes/FCenter';

type CalendarViewReminderItemProps = {
  reminder: CalendarReminder;
};

const CalendarViewReminderItem = ({reminder}: CalendarViewReminderItemProps) => {
  const groups = useAppSelector(InfoSelectors.groups);
  const items = useAppSelector(InfoSelectors.items);

  const group = reminder.parentId && groups.get(reminder.parentId);
  const item = reminder.targetId && items.get(reminder.targetId);

  const bulletView = <Bullet color={group?.color} size="15px" />;
  const groupView = group ? <GroupLink group={group} color="gray.400" /> : null;
  const itemView = item ? <ItemLink item={item} /> : null;

  const date = DateFormatters.formatTime(new Date(reminder.date));

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
        <Text color="gray.500">{date}</Text>
      </Box>
    </FHStack>
  );
};

export default CalendarViewReminderItem;
