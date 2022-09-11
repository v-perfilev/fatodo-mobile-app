import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';
import StatusView from '../../../components/views/StatusView';

const ItemViewStatus = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);

  return (
    <LabeledBox label={t('item:labels.status')}>
      <StatusView statusType={item.status} />
    </LabeledBox>
  );
};

export default ItemViewStatus;
