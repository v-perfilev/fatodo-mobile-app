import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewGroup = () => {
  const {t} = useTranslation();
  const group = useAppSelector(ItemSelectors.group);

  return (
    <LabeledBox label={t('item:labels.group')} isText>
      {group?.title}
    </LabeledBox>
  );
};

export default ItemViewGroup;
