import React, {ComponentType, useCallback} from 'react';
import {useAppSelector} from '../../../store/store';
import {Event} from '../../../models/Event';
import InfoSelectors from '../../../store/info/infoSelectors';
import {User} from '../../../models/User';

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
    const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
    const contactEvent = event.contactEvent;
    const date = event.date;

    const firstUser = useAppSelector((state) => userSelector(state, contactEvent.firstUserId));
    const secondUser = useAppSelector((state) => userSelector(state, contactEvent.secondUserId));

    return <Component firstUser={firstUser} secondUser={secondUser} date={date} />;
  };

export default withEventContact;
