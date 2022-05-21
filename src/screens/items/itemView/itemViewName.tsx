import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewGroup = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.itemSelector);

  return (
    <LabeledBox label={t('item:labels.item')} isText>
      {item.title}
    </LabeledBox>
  );
};

export default ItemViewGroup;
