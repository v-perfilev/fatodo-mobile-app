import React, {ComponentType, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';

export type WithEventReminderProps = {
  group?: GroupInfo;
  item?: ItemInfo;
  date: number;
};

type ContainerProps = {
  event: Event;
};

const withEventReminder =
  (Component: ComponentType<WithEventReminderProps>) =>
  ({event}: ContainerProps) => {
    const groups = useAppSelector(InfoSelectors.groups);
    const items = useAppSelector(InfoSelectors.items);
    const reminderEvent = event.reminderEvent;
    const date = event.createdAt;

    const eventGroup = useMemo<GroupInfo>(() => reminderEvent.groupId && groups.get(reminderEvent.groupId), [groups]);
    const eventItem = useMemo<ItemInfo>(() => reminderEvent.itemId && items.get(reminderEvent.itemId), [items]);

    return <Component group={eventGroup} item={eventItem} date={date} />;
  };

export default withEventReminder;
