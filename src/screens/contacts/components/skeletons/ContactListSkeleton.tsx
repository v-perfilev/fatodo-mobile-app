import React, {memo} from 'react';
import {CONTACT_SKELETONS_HEIGHT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import Separator from '../../../../components/layouts/Separator';
import {Box} from 'native-base';
import ContactSkeleton from './ContactSkeleton';
import {Dimensions} from 'react-native';

const ContactListSkeleton = () => {
  const height = Dimensions.get('window').height;
  const count = Math.round(height / CONTACT_SKELETONS_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

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
