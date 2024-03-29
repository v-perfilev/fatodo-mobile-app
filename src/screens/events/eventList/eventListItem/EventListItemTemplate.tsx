import React, {memo, ReactElement} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Text, useColorModeValue} from 'native-base';
import PaperBox from '../../../../components/surfaces/PaperBox';
import EventSkeleton from '../../skeletons/EventSkeleton';
import DateView from '../../../../components/views/DateView';

type EventListItemTemplateProps = {
  image?: ReactElement;
  title: string;
  content: ReactElement;
  message?: string;
  date: number;
  loading?: boolean;
};

const EventListItemTemplate = ({image, title, content, message, date, loading}: EventListItemTemplateProps) => {
  const dateToShow = new Date(date);

  const titleColor = useColorModeValue('gray.500', 'gray.400');
  const messageBg = useColorModeValue('gray.100', 'gray.700');

  const template = (
    <FHStack grow px="2" py="4" space="3" alignItems="flex-start">
      {image}
      <FVStack grow space="2">
        <FHStack grow space="3" alignItems="center">
          <FHStack grow>
            <Text color={titleColor} fontWeight="bold">
              {title}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            <DateView date={dateToShow} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
          </Text>
        </FHStack>
        <Text fontSize="sm">{content}</Text>
        {message && (
          <PaperBox mt="2" px="2" py="1" borderRadius="xl" borderWidth="0" bg={messageBg}>
            <Text fontSize="sm" numberOfLines={3} isTruncated>
              {message}
            </Text>
          </PaperBox>
        )}
      </FVStack>
    </FHStack>
  );

  return loading ? <EventSkeleton /> : template;
};

export default memo(EventListItemTemplate);
