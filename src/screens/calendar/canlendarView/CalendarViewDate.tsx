import React, {Dispatch, SetStateAction, useMemo} from 'react';
import moment from 'moment';
import {Text} from 'native-base';
import PaperBox from '../../../components/surfaces/PaperBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import PressableButton from '../../../components/controls/PressableButton';
import {useAppSelector} from '../../../store/store';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import Bullet from '../../../components/surfaces/Bullet';
import InfoSelectors from '../../../store/info/infoSelectors';
import {FilterUtils} from '../../../shared/utils/FilterUtils';
import {ColorScheme} from '../../../shared/themes/ThemeFactory';

type CalendarViewDateProps = {
  date: moment.Moment;
  year: number;
  month: number;
  activeDate: moment.Moment;
  selectDate: Dispatch<SetStateAction<moment.Moment>>;
};

const CalendarViewDate = ({date, year, month, activeDate, selectDate}: CalendarViewDateProps) => {
  const monthKey = CalendarUtils.buildMonthKey(year, month);
  const reminders = useAppSelector((state) => CalendarSelectors.reminders(state, monthKey));
  const groups = useAppSelector(InfoSelectors.groups);

  const isActiveMonth = date.month() === month;
  const isActiveDate = date === activeDate;

  const handlePress = (): void => {
    isActiveMonth && selectDate(date);
  };

  const reminderColors = useMemo<ColorScheme[]>(() => {
    const reminderGroups = CalendarUtils.filterByMoment(reminders, date)
      .map((reminder) => groups.get(reminder.parentId))
      .filter(FilterUtils.notUndefinedFilter);
    return reminderGroups.map((g) => g.color);
  }, [reminders, groups]);

  const reminderColorsToShow = reminderColors.slice(0, 3);
  const showDots = reminderColors.length > 3;

  let bg = isActiveMonth ? undefined : 'gray.100';
  bg = isActiveDate && isActiveMonth ? 'primary.100:alpha.30' : bg;
  const borderColor = isActiveDate && isActiveMonth ? 'primary.500' : 'gray.200';
  const dateColor = isActiveMonth ? 'gray.500' : 'gray.400';

  return (
    <PressableButton m="1" flexGrow="1" flexBasis="1" onPress={handlePress}>
      <PaperBox height="70px" bg={bg} borderColor={borderColor}>
        <FVStack>
          <FHStack justifyContent="flex-end">
            <Text fontSize="18" fontWeight="extrabold" color={dateColor}>
              {date.date()}
            </Text>
          </FHStack>
          {isActiveMonth && (
            <FVStack space="1">
              {reminderColorsToShow.map((color, index) => (
                <Bullet color={color} size="4px" fullWidth key={index} />
              ))}
              {showDots && (
                <FHStack space="1" grow justifyContent="center">
                  {Array.from({length: 3}).map((_, index) => (
                    <Bullet size="5px" key={index} />
                  ))}
                </FHStack>
              )}
            </FVStack>
          )}
        </FVStack>
      </PaperBox>
    </PressableButton>
  );
};

export default CalendarViewDate;
