import React, {ComponentType, memo, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';
import {MapUtils} from '../../utils/MapUtils';
import {flowRight} from 'lodash';

export type WithEventItemProps = {
  user?: User;
  users?: User[];
  group?: GroupInfo;
  item?: ItemInfo;
  date: number;
};

type ContainerProps = {
  event: Event;
};

const withEventItem =
  (Component: ComponentType<WithEventItemProps>) =>
  ({event}: ContainerProps) => {
    const users = useAppSelector(InfoSelectors.users);
    const groups = useAppSelector(InfoSelectors.groups);
    const items = useAppSelector(InfoSelectors.items);
    const itemEvent = event.itemEvent;
    const date = event.date;

    const eventUser = useMemo<User>(() => users.get(itemEvent?.userId), [users]);
    const eventUsers = useMemo<User[]>(() => MapUtils.get(users, itemEvent?.userIds), [users]);
    const eventGroup = useMemo<GroupInfo>(() => groups.get(itemEvent?.groupId), [groups]);
    const eventItem = useMemo<ItemInfo>(() => items.get(itemEvent?.itemId), [items]);

    return <Component user={eventUser} users={eventUsers} group={eventGroup} item={eventItem} date={date} />;
  };

export default flowRight(withEventItem, memo);
