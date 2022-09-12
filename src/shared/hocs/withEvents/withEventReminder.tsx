import React, {ComponentType, useCallback} from 'react';
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
    const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
    const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
    const reminderEvent = event.reminderEvent;
    const date = event.date;

    const group = useAppSelector((state) => groupSelector(state, reminderEvent.groupId));
    const item = useAppSelector((state) => itemSelector(state, reminderEvent.itemId));

    return <Component group={group} item={item} date={date} />;
  };

export default withEventReminder;
