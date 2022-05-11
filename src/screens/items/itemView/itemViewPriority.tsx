import React from 'react';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import PriorityView from '../../../components/views/PriorityView';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';

const ItemViewPriority = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('item:labels.priority')}>
      <PriorityView priority={item.priority} />
    </LabeledBox>
  );
};

export default ItemViewPriority;
