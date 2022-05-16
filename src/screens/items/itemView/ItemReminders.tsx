import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ReminderView from '../../../components/views/ReminderView';
import ChipBox from '../../../components/surfaces/ChipBox';
import FHStack from '../../../components/surfaces/FHStack';

const ItemReminders: FC = () => {
  const {t} = useTranslation();
  const {reminders} = useReminderListContext();

  return (
    <LabeledBox label={t('item:labels.reminders')}>
      <FHStack space="2">
        {reminders.map((reminder) => (
          <ChipBox key={reminder.id}>
            <ReminderView reminder={reminder} />
          </ChipBox>
        ))}
      </FHStack>
    </LabeledBox>
  );
};

export default ItemReminders;
