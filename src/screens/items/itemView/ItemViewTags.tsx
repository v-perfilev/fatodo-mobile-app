import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';

const ItemViewTags: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  const showTags = item.tags?.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('item:labels.tags')}>
        {item.tags.map((tag) => (
          <Chip key={tag} size="medium" label={tag} />
        ))}
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
