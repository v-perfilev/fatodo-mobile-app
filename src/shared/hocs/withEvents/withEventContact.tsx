import React, {ComponentType, memo, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';
import {flowRight} from 'lodash';

export type WithEventContactProps = {
  firstUser: User;
  secondUser: User;
  date: number;
};

type ContainerProps = {
  event: Event;
};

const withEventContact =
  (Component: ComponentType<WithEventContactProps>) =>
  ({event}: ContainerProps) => {
    const users = useAppSelector(InfoSelectors.users);
    const contactEvent = event.contactEvent;
    const date = event.date;

    const eventFirstUser = useMemo<User>(() => users.get(contactEvent?.firstUserId), [users]);
    const eventSecondUser = useMemo<User>(() => users.get(contactEvent?.secondUserId), [users]);

    return <Component firstUser={eventFirstUser} secondUser={eventSecondUser} date={date} />;
  };

export default flowRight(withEventContact, memo);
