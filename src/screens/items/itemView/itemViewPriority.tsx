import React from 'react';
import PriorityView from '../../../components/views/PriorityView';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewPriority = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.itemSelector);

  return (
    <LabeledBox label={t('item:labels.priority')}>
      <PriorityView priority={item.priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
