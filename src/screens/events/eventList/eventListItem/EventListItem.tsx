import React from 'react';
import {Box, IBoxProps} from 'native-base';
import {Event} from '../../../../models/Event';

type EventListItemProps = IBoxProps & {
  event: Event;
};

const EventListItem = ({event, ...props}: EventListItemProps) => {
  return <Box {...props}>{event.id}</Box>;
};

export default EventListItem;
