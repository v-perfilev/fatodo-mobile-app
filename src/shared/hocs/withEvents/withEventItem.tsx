import React, {ComponentType, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';
import {MapUtils} from '../../utils/MapUtils';

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
    const date = event.createdAt;

    const eventUser = useMemo<User>(() => itemEvent.userId && users.get(itemEvent.userId), [users]);
    const eventUsers = useMemo<User[]>(() => itemEvent.userIds && MapUtils.get(users, itemEvent.userIds), [users]);
    const eventGroup = useMemo<GroupInfo>(() => itemEvent.groupId && groups.get(itemEvent.groupId), [groups]);
    const eventItem = useMemo<ItemInfo>(() => itemEvent.itemId && items.get(itemEvent.itemId), [items]);

    return <Component user={eventUser} users={eventUsers} group={eventGroup} item={eventItem} date={date} />;
  };

export default withEventItem;
