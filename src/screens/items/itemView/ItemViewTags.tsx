import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import PaperBox from '../../../components/surfaces/PaperBox';

const ItemViewTags: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  const showTags = item.tags?.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('item:labels.tags')}>
        {item.tags.map((tag) => (
          <PaperBox key={tag}>{tag}</PaperBox>
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
