import React, {ComponentType, useMemo} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';

export type WithEventContactProps = {
  firstUser: User;
  secondUser: User;
  date: Date;
};

type ContainerProps = {
  event: Event;
};

const withEventContact =
  (Component: ComponentType<WithEventContactProps>) =>
  ({event}: ContainerProps) => {
    const users = useAppSelector(InfoSelectors.users);
    const contactEvent = event.contactEvent;
    const date = event.createdAt;

    const eventFirstUser = useMemo<User>(() => users.get(contactEvent.firstUserId), [users]);
    const eventSecondUser = useMemo<User>(() => users.get(contactEvent.secondUserId), [users]);

    return <Component firstUser={eventFirstUser} secondUser={eventSecondUser} date={date} />;
  };

export default withEventContact;
