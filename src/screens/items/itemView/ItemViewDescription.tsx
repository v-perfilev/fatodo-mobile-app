import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import LabeledBox from '../../../components/surfaces/LabeledBox';
import {useAppSelector} from '../../../store/store';
import ItemSelectors from '../../../store/item/itemSelectors';

const ItemViewDescription = () => {
  const {t} = useTranslation();
  const item = useAppSelector(ItemSelectors.item);

  return item?.description ? (
    <LabeledBox label={t('item:labels.description')} isVertical>
      {item.description}
    </LabeledBox>
  ) : (
    <Text>{t('item:view.noDescription')}</Text>
  );
};

export default ItemViewDescription;
