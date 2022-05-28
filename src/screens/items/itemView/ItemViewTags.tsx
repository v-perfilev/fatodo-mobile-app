import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import ChipBox from '../../../components/surfaces/ChipBox';
import FHStack from '../../../components/boxes/FHStack';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewTags: FC = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);

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
