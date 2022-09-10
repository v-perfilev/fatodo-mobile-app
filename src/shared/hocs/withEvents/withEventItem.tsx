import React, {ComponentType} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {GroupInfo} from '../../../models/Group';
import {ItemInfo} from '../../../models/Item';

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
    const itemEvent = event.itemEvent;
    const date = event.date;

    const user = useAppSelector((state) => InfoSelectors.user(state, itemEvent.userId));
    const users = useAppSelector((state) => InfoSelectors.users(state, itemEvent.userIds));
    const group = useAppSelector((state) => InfoSelectors.group(state, itemEvent.groupId));
    const item = useAppSelector((state) => InfoSelectors.item(state, itemEvent.itemId));

    return <Component user={user} users={users} group={group} item={item} date={date} />;
  };

export default withEventItem;
