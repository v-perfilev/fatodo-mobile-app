import React from 'react';
import {useTranslation} from 'react-i18next';
import {useGroupViewContext} from '../../../shared/contexts/viewContexts/groupViewContext';
import LabeledBox from '../../../components/surfaces/LabeledBox';

const ItemViewGroup = () => {
  const {t} = useTranslation();
  const {group} = useGroupViewContext();

  return (
    <LabeledBox label={t('item:labels.group')} isText>
      {group.title}
    </LabeledBox>
  );
};

export default ItemViewGroup;
