import React from 'react';
import moment from 'moment';
import {Box, Text} from 'native-base';
import PaperBox from '../../../components/surfaces/PaperBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';

type CalendarViewDateProps = {
  date: moment.Moment;
  year: number;
  month: number;
};

const CalendarViewItem = () => <Box width="100%" height="5px" rounded="5px" bg="primary.500" />;

const CalendarViewDots = () => (
  <FHStack grow smallSpace justifyContent="center">
    {Array.from({length: 3}).map((_, index) => (
      <Box width="5px" height="5px" rounded="5px" bg="primary.500" key={index} />
    ))}
  </FHStack>
);

const CalendarViewDate = ({date, year, month}: CalendarViewDateProps) => {
  const monthKey = CalendarUtils.buildMonthKey(year, month);
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, monthKey));

  const isActiveMonth = date.month() === month;

  const remindersCount = CalendarUtils.filterByMoment(reminders, date).length;
  const itemsToShowCount = remindersCount > 3 ? 3 : remindersCount;
  const showDots = remindersCount > 3;

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1">
      <PaperBox height="70px" bg={isActiveMonth ? undefined : 'gray.100'}>
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="18" fontWeight="extrabold" color={isActiveMonth ? 'gray.500' : 'gray.400'}>
              {date.date()}
            </Text>
          </FHStack>
          {isActiveMonth && (
            <FVStack smallSpace>
              {Array.from({length: itemsToShowCount}).map((_, index) => (
                <CalendarViewItem key={index} />
              ))}
              {showDots && <CalendarViewDots />}
            </FVStack>
          )}
        </FVStack>
      </PaperBox>
    </PressableButton>
  );
};

export default CalendarViewDate;
