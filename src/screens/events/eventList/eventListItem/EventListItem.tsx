import React from 'react';
import {Event} from '../../../../models/Event';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';

type EventListItemProps = {
  event: Event;
};

const EventListItem = ({event}: EventListItemProps) => {
  return (
    <FHStack space="2">
      <Text>{event.id}</Text>
    </FHStack>
  );
};

export default EventListItem;
