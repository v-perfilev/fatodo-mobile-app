import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ChipBox from '../../../components/surfaces/ChipBox';
import FHStack from '../../../components/surfaces/FHStack';

const ItemViewTags: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return (
    <LabeledBox label={t('item:labels.tags')}>
      <FHStack space="2">
        {item.tags.map((tag) => (
          <ChipBox key={tag}>{tag}</ChipBox>
        ))}
      </FHStack>
    </LabeledBox>
  );
};

export default ItemViewTags;
