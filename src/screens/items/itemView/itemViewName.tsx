import React from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';

const ItemViewGroup = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('item:labels.item')} isText>
      {item.title}
    </LabeledBox>
  );
};

export default ItemViewGroup;
