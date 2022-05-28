import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ReminderView from '../../../components/views/ReminderView';
import ChipBox from '../../../components/surfaces/ChipBox';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemReminders: FC = () => {
  const {t} = useTranslation();
  const reminders = useAppSelector(ItemSelectors.reminders);

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
