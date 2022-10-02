import React, {memo} from 'react';
import {EVENT_SKELETONS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import EventSkeleton from './EventSkeleton';

const EventListSkeleton = () => {
  const indexArray = Array.from(Array(EVENT_SKELETONS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <EventSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(EventListSkeleton);
