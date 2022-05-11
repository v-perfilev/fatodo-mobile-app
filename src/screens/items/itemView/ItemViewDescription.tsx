import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import {useItemViewContext} from '../../../shared/contexts/viewContexts/itemViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';

const ItemViewDescription: FC = () => {
  const {t} = useTranslation();
  const {item} = useItemViewContext();

  return item.description ? (
    <LabeledBox label={t('item:labels.description')} isText>
      {item.description}
    </LabeledBox>
  ) : (
    <Text>{t('item:view.noDescription')}</Text>
  );
};

export default ItemViewDescription;
