import React from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import DateView from '../../../components/views/DateView';

const ItemViewDate = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')} isText>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
