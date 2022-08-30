import React, {ReactElement} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';

type EventListItemTemplateProps = {
  image?: ReactElement;
  title: string;
  content: ReactElement;
  message?: string;
  date: number;
};

const EventListItemTemplate = ({image, title, content, message, date}: EventListItemTemplateProps) => {
  const dateToShow = DateFormatters.formatDependsOnDay(new Date(date));

  return (
    <FHStack grow my="2">
      {image && (
        <FHStack mr="2" alignItems="center">
          {image}
        </FHStack>
      )}
      <FVStack grow basis>
        <FHStack grow defaultSpace alignItems="center">
          <FHStack grow>
            <Text color="gray.600" fontWeight="bold">
              {title}
            </Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            {dateToShow}
          </Text>
        </FHStack>
        <Text>{content}</Text>
        {message && <Text>{message}</Text>}
      </FVStack>
    </FHStack>
  );
};

export default EventListItemTemplate;
