import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ChipBox from '../../../components/surfaces/ChipBox';
import {HStack} from 'native-base';

const ItemViewTags: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  const showTags = item.tags?.length > 0;

  return (
    showTags && (
      <LabeledBox label={t('item:labels.tags')}>
        <HStack space="2">
          {item.tags.map((tag) => (
            <ChipBox key={tag}>{tag}</ChipBox>
          ))}
        </HStack>
      </LabeledBox>
    )
  );
};

export default ItemViewTags;
