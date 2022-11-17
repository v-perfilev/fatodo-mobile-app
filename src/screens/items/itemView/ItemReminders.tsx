import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ReminderView from '../../../components/views/ReminderView';
import ChipBox from '../../../components/surfaces/ChipBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import FContainer from '../../../components/boxes/FContainer';

const ItemReminders = () => {
  const {t} = useTranslation();
  const reminders = useAppSelector(ItemSelectors.reminders);

  return (
    <LabeledBox label={t('item:labels.reminders')}>
      <FContainer itemM="1">
        {reminders.map((reminder, index) => (
          <ChipBox key={index}>
            <ReminderView reminder={reminder} />
          </ChipBox>
        ))}
      </FContainer>
    </LabeledBox>
  );
};

export default ItemReminders;
