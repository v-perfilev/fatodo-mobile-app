import React, {memo} from 'react';
import {CONTACT_ITEMS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import ContactSkeleton from './ContactSkeleton';

const ContactListSkeleton = () => {
  const indexArray = Array.from(Array(CONTACT_ITEMS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Separator />}
          <ContactSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(ContactListSkeleton);
