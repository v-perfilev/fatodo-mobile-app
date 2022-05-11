import React from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';

const ItemViewDate = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')}>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
