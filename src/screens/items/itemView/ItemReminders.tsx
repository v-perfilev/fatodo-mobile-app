import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ReminderView from '../../../components/views/ReminderView';
import PaperBox from '../../../components/surfaces/PaperBox';

const ItemReminders: FC = () => {
  const {t} = useTranslation();
  const {reminders} = useReminderListContext();

  const showReminders = reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('item:labels.reminders')}>
        {reminders.map((reminder) => (
          <PaperBox key={reminder.id}>
            <ReminderView reminder={reminder} />
          </PaperBox>
        ))}
      </LabeledBox>
    )
  );
};

export default ItemReminders;
