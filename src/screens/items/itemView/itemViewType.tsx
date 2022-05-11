import React from 'react';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import TypeView from '../../../components/views/TypeView';
import {useTranslation} from 'react-i18next';

const ItemViewType = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('item:labels.type')}>
      <TypeView type={item.type} />
    </LabeledBox>
  );
};

export default ItemViewType;
