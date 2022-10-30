import React from 'react';
import {Trans, useTranslation} from 'react-i18next';
import EventListItemTemplate from '../EventListItemTemplate';
import {Event} from '../../../../../models/Event';
import IconPic from '../../../../../components/surfaces/IconPic';
import GreetingIcon from '../../../../../components/icons/GreetingIcon';

type EventWelcomeProps = {
  event: Event;
};

const EventWelcome = ({event}: EventWelcomeProps) => {
  const {t} = useTranslation();
  const date = event.date;

  const image = <IconPic icon={<GreetingIcon />} size="md" />;

  const title = t('event:default.welcome.title');

  const content = <Trans i18nKey="event:default.welcome.content" />;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} />;
};

export default EventWelcome;
