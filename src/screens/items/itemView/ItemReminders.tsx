import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useReminderListContext} from '../../../shared/contexts/listContexts/reminderListContext';

const ItemReminders: FC = () => {
  const {t} = useTranslation();
  const {reminders} = useReminderListContext();

  const showReminders = reminders?.length > 0;

  return (
    showReminders && (
      <LabeledBox label={t('item:labels.reminders')}>
        {reminders.map((reminder) => (
          <Chip key={reminder.id} size="medium" label={<ReminderView reminder={reminder} />} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemReminders;
