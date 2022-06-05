import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

const CommentsViewStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow mb="60px">
      <Text>{t('comments:view.commentsNotFound')}</Text>
    </FCenter>
  );
};

export default CommentsViewStub;
