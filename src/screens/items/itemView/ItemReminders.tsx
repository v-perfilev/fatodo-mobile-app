import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ReminderView from '../../../components/views/ReminderView';
import ChipBox from '../../../components/surfaces/ChipBox';
import {HStack} from 'native-base';

const ItemReminders: FC = () => {
  const {t} = useTranslation();
  const {reminders} = useReminderListContext();

  const showReminders = reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('item:labels.reminders')}>
        <HStack space="2">
          {reminders.map((reminder) => (
            <ChipBox key={reminder.id}>
              <ReminderView reminder={reminder} />
            </ChipBox>
          ))}
        </HStack>
      </LabeledBox>
    )
  );
};

export default ItemReminders;
