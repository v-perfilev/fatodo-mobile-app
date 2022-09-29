import React, {memo, ReactElement} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import PaperBox from '../../../../components/surfaces/PaperBox';
import EventSkeleton from '../../components/skeletons/EventSkeleton';
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

  const template = (
    <FHStack grow px="2" py="4" defaultSpace alignItems="flex-start">
      {image}
      <FVStack grow space="2">
        <FHStack grow defaultSpace alignItems="center">
          <FHStack grow>
            <Text color="gray.600" fontWeight="bold">
              {title}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            <DateView date={dateToShow} timeFormat="FULL" dateFormat="DEPENDS_ON_DAY" />
          </Text>
        </FHStack>
        <Text>{content}</Text>
        {message && (
          <PaperBox mt="2" px="2" py="1" borderWidth="0" bg="gray.50">
            <Text numberOfLines={3} isTruncated>
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
