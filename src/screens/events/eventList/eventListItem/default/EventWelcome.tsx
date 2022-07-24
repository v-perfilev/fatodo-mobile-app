import React from 'react';
import {Text} from 'native-base';
import {Trans, useTranslation} from 'react-i18next';
import EventListItemTemplate from '../EventListItemTemplate';
import {Event} from '../../../../../models/Event';

type EventWelcomeProps = {
  event: Event;
};

const EventWelcome = ({event}: EventWelcomeProps) => {
  const {t} = useTranslation();
  const date = event.createdAt;

  const title = t('event:default.welcome.title');

  let content = (
    <Text>
      <Trans i18nKey="event:default.welcome.content" />
    </Text>
  );

  return <EventListItemTemplate title={title} content={content} date={date} />;
};

export default EventWelcome;
