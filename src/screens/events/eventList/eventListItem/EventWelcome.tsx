import React from 'react';
import {Box} from 'native-base';
import EventListItemTemplate from './EventListItemTemplate';

const EventWelcome = () => {
  const title = 'Test';
  const content = <Box>Test</Box>;
  // const message = 'Message';
  const message: string = undefined;
  return <EventListItemTemplate title={title} content={content} message={message} date={new Date()} />;
};

export default EventWelcome;
