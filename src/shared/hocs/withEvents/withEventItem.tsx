import React, {ComponentType, useCallback} from 'react';
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
    const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
    const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
    const groupSelector = useCallback(InfoSelectors.makeGroupSelector(), []);
    const itemSelector = useCallback(InfoSelectors.makeItemSelector(), []);
    const itemEvent = event.itemEvent;
    const date = event.date;

    const user = useAppSelector((state) => userSelector(state, itemEvent.userId));
    const users = useAppSelector((state) => usersSelector(state, itemEvent.userIds));
    const group = useAppSelector((state) => groupSelector(state, itemEvent.groupId));
    const item = useAppSelector((state) => itemSelector(state, itemEvent.itemId));

    return <Component user={user} users={users} group={group} item={item} date={date} />;
  };

export default withEventItem;
