import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../../components/boxes/FCenter';

const GroupViewStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('group:view.itemsNotFound')}</Text>
    </FCenter>
  );
};

export default GroupViewStub;
