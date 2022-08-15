import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';

const CommentListStub = () => {
  const {t} = useTranslation();

  return <StubBox inverted>{t('comment:view.commentsNotFound')}</StubBox>;
};

export default CommentListStub;
