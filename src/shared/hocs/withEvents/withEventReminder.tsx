import React, {ComponentType, memo, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';
import {flowRight} from 'lodash';

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
    const date = event.date;

    const eventGroup = useMemo<GroupInfo>(() => groups.get(reminderEvent?.groupId), [groups]);
    const eventItem = useMemo<ItemInfo>(() => items.get(reminderEvent?.itemId), [items]);

    return <Component group={eventGroup} item={eventItem} date={date} />;
  };

export default flowRight(withEventReminder, memo);
