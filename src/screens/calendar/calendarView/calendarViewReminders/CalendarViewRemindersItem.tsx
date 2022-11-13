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

type CalendarViewRemindersItemProps = {
  reminder: CalendarReminder;
};

const CalendarViewRemindersItem = ({reminder}: CalendarViewRemindersItemProps) => {
  const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
  const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
  const group = useAppSelector((state) => groupSelector(state, reminder.parentId));
  const item = useAppSelector((state) => itemSelector(state, reminder.targetId));

  const bulletView = <Bullet color={group?.color} size="15px" />;
  const groupView = group ? <GroupLink group={group} color="gray.400" /> : null;
  const itemView = item ? <ItemLink item={item} /> : null;
  const date = new Date(reminder.date);

  return (
    <FHStack defaultSpace alignItems="center" py="1">
      <FBox grow={false} height="15px">
        {bulletView}
      </FBox>
      <FVStack grow>
        <Text fontSize="16" fontWeight="bold" isTruncated>
          {itemView}
        </Text>
        <Text fontSize="14" fontWeight="bold" isTruncated>
          {groupView}
        </Text>
      </FVStack>
      <Box>
        <Text color="gray.400" fontSize="xs">
          <DateView date={date} timeFormat="FULL" />
        </Text>
      </Box>
    </FHStack>
  );
};

export default CalendarViewRemindersItem;
