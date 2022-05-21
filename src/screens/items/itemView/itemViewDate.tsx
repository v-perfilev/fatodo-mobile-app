import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import DateView from '../../../components/views/DateView';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewDate = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.itemSelector);

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')} isText>
        <DateView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
