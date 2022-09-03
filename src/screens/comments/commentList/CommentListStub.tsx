import React from 'react';
import {useTranslation} from 'react-i18next';
import StubBox from '../../../components/surfaces/StubBox';
import {HEADER_HEIGHT} from '../../../constants';

const CommentListStub = () => {
  const {t} = useTranslation();

  return (
    <StubBox paddingTop={HEADER_HEIGHT} inverted>
      {t('comment:view.commentsNotFound')}
    </StubBox>
  );
};

export default CommentListStub;
