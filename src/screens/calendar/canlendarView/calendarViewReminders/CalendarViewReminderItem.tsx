import React, {ReactElement, useMemo} from 'react';
import {CalendarReminder} from '../../../../models/Reminder';
import GroupLink from '../../../../components/links/GroupLink';
import ItemLink from '../../../../components/links/ItemLink';
import {useAppSelector} from '../../../../store/store';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {GroupInfo} from '../../../../models/Group';
import {ItemInfo} from '../../../../models/Item';
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

  const group = useMemo<GroupInfo>(() => reminder.parentId && groups.get(reminder.parentId), [groups]);
  const item = useMemo<ItemInfo>(() => reminder.targetId && items.get(reminder.targetId), [items]);

  const Group = (): ReactElement => (group ? <GroupLink group={group} color="gray.400" /> : null);
  const Item = (): ReactElement => (item ? <ItemLink item={item} /> : null);

  const date = DateFormatters.formatTime(new Date(reminder.date));

  return (
    <FHStack grow defaultSpace alignItems="center">
      <Box>
        <FCenter justifyContent="center" alignItems="center">
          <Bullet color={group?.color} size="15px" />
        </FCenter>
      </Box>
      <FVStack grow>
        <Text fontSize="16" fontWeight="bold" isTruncated>
          <Item />
        </Text>
        <Text fontSize="14" fontWeight="bold" isTruncated>
          <Group />
        </Text>
      </FVStack>
      <Box>
        <Text color="gray.500">{date}</Text>
      </Box>
    </FHStack>
  );
};

export default CalendarViewReminderItem;
