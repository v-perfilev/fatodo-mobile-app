import React from 'react';
import {useTranslation} from 'react-i18next';
import {IBoxProps, Text} from 'native-base';
import FCenter from '../../../components/boxes/FCenter';

type CommentViewStubProps = IBoxProps;

const CommentsViewStub = (props: CommentViewStubProps) => {
  const {t} = useTranslation();

  return (
    <FCenter grow {...props}>
      <Text>{t('comment:view.commentsNotFound')}</Text>
    </FCenter>
  );
};

export default CommentsViewStub;
