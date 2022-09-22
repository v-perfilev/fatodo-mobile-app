import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import DateParamView from '../../../components/views/DateParamView';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewDate = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);

  return (
    item?.date && (
      <LabeledBox label={t('item:labels.date')} isText>
        <DateParamView date={item.date} />
      </LabeledBox>
    )
  );
};

export default ItemViewDate;
