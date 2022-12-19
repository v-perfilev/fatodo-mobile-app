import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../../components/surfaces/StubBox';
import FVStack from '../../../../components/boxes/FVStack';
import {Image, Text} from 'native-base';

const img = require('../../../../../assets/images/content-3.png');
const size = 100;

const CalendarViewRemindersEmptyStub = () => {
  const {t} = useTranslation();

  return (
    <StubBox>
      <FVStack width="100%" space="3" alignItems="center">
        <Image opacity="0.8" source={img} width={`${size}px`} height={`${size}px`} alt="Fatodo octopus" />
        <Text width="100%" fontSize="md" fontWeight="bold" color="gray.400" textAlign="center">
          {t('calendar:list.noReminders')}
        </Text>
      </FVStack>
    </StubBox>
  );
};

export default CalendarViewRemindersEmptyStub;
