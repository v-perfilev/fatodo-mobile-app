import React, {memo, ReactElement} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import PlusIcon from '../../../../components/icons/PlusIcon';
import FHStack from '../../../../components/boxes/FHStack';
import {Text} from 'native-base';
import {DateFormatters} from '../../../../shared/utils/DateUtils';
import FBox from '../../../../components/boxes/FBox';

type EventListItemTemplateProps = {
  title: string;
  content: ReactElement;
  message?: string;
  date: Date;
};

const EventListItemTemplate = ({title, content, message, date}: EventListItemTemplateProps) => {
  const dateToShow = DateFormatters.formatDependsOnDay(new Date(date));

  return (
    <FHStack grow>
      <FHStack w="50" alignItems="center">
        <PlusIcon />
      </FHStack>
      <FVStack grow>
        <FHStack grow defaultSpace alignItems="center">
          <FHStack grow>
            <Text fontWeight="bold">{title}</Text>
          </FHStack>
          <Text color="gray.400" fontWeight="bold" fontSize="xs">
            {dateToShow}
          </Text>
        </FHStack>
        <FBox>{content}</FBox>
        {message && <Text isTruncated>{message}</Text>}
      </FVStack>
    </FHStack>
  );
};

export default memo(EventListItemTemplate);
