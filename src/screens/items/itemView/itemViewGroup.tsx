import React from 'react';
import {Box} from 'native-base';
import {useTranslation} from 'react-i18next';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';

const ItemViewGroup = () => {
  const {t} = useTranslation();
  const {group} = useGroupViewContext();

  return (
    <LabeledBox label={t('item:labels.group')}>
      <Box>{group.title}</Box>
    </LabeledBox>
  );
};

export default ItemViewGroup;
