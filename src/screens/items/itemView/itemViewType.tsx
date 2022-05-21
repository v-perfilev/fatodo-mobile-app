import React from 'react';
import TypeView from '../../../components/views/TypeView';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewType = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.itemSelector);

  return (
    <LabeledBox label={t('item:labels.type')}>
      <TypeView type={item.type} />
    </LabeledBox>
  );
};

export default ItemViewType;
