import React from 'react';
import {Text} from 'native-base';
import Separator from './Separator';
import FVStack from '../boxes/FVStack';

type SubtitleProps = {
  subtitle: string;
};

const Subtitle = ({subtitle}: SubtitleProps) => {
  return (
    <FVStack space="2">
      <Text fontWeight="400" fontSize="md" lineHeight="md" color="primary.500">
        {subtitle}
      </Text>
      <Separator bg="primary.500" />
    </FVStack>
  );
};

export default Subtitle;
