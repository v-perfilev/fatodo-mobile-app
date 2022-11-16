import React, {memo, useMemo} from 'react';
import Header from '../../../components/layouts/Header';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import IconButton from '../../../components/controls/IconButton';
import {useCalendarContext} from '../../../shared/contexts/CalendarContext';
import Animated, {useAnimatedStyle, useDerivedValue} from 'react-native-reanimated';
import {CalendarEnrichedDate} from '../../../models/Calendar';

const CalendarViewHeader = () => {
  const {dateIndex, setDate} = useCalendarContext();

  const currentDate = useMemo<CalendarEnrichedDate>(() => {
    return CalendarUtils.getCurrentDate();
  }, []);

  const goToCurrentDate = (): void => {
    setDate(currentDate);
  };

  const isCurrentDate = useDerivedValue(() => {
    return dateIndex.value === currentDate.dateIndex;
  });

  const buttonStyle = useAnimatedStyle(() => ({
    display: isCurrentDate.value ? 'none' : 'flex',
  }));

  return (
    <Header showAvatar hideGoBack>
      <Animated.View style={buttonStyle}>
        <IconButton size="xl" p="2" icon={<ActiveDateIcon />} onPress={goToCurrentDate} />
      </Animated.View>
    </Header>
  );
};

export default memo(CalendarViewHeader);
