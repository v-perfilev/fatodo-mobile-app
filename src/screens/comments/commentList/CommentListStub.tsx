import React from 'react';
import {useTranslation} from 'react-i18next';
import {Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

const CommentListStub = () => {
  const {t} = useTranslation();

  return (
    <FCenter grow>
      <Text>{t('comment:view.commentsNotFound')}</Text>
    </FCenter>
  );
};

export default CommentListStub;
