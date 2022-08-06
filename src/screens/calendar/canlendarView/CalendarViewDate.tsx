import React from 'react';
import moment from 'moment';
import {Box, Text} from 'native-base';
import PaperBox from '../../../components/surfaces/PaperBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';

type CalendarViewDateProps = {
  date: moment.Moment;
  month: number;
};

const CalendarViewItem = () => <Box width="100%" height="5px" rounded="5px" bg="primary.500" />;

const CalendarViewDots = () => (
  <FHStack grow smallSpace justifyContent="center">
    {Array.from({length: 3}).map((_, index) => (
      <Box width="5px" height="5px" rounded="5px" bg="gray.300" key={index} />
    ))}
  </FHStack>
);

const CalendarViewDate = ({date, month}: CalendarViewDateProps) => {
  const isActiveMonth = date.month() === month;

  return (
    <PaperBox height="70px" flexGrow="1" flexBasis="1" m="1" bg={isActiveMonth ? undefined : 'gray.100'}>
      <FVStack>
        <FHStack justifyContent="flex-end">
          <Text fontSize="18" fontWeight="extrabold" color={isActiveMonth ? 'gray.500' : 'gray.400'}>
            {date.date()}
          </Text>
        </FHStack>
        {isActiveMonth && (
          <FVStack smallSpace>
            <CalendarViewItem />
            <CalendarViewItem />
            <CalendarViewItem />
            <CalendarViewDots />
          </FVStack>
        )}
      </FVStack>
    </PaperBox>
  );
};

export default CalendarViewDate;
