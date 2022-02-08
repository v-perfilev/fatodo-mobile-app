import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'react-native';

const Test: FC = () => {
  const {t} = useTranslation();

  return <Text>{t('hello')}</Text>;
};

export default Test;
