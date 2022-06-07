import React, {useState} from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import CommentsViewControl from './CommentsViewControl';
import CommentsViewContainer from './CommentsViewContainer';
import {Comment} from '../../../models/Comment';
import Header from '../../../components/layouts/Header';

type CommentsViewProps = WithCommentsProps;

const CommentsView = ({loading}: CommentsViewProps) => {
  const [reference, setReference] = useState<Comment>();

  const clearReference = (): void => {
    setReference(null);
  };

  return (
    <>
      <Header />
      <ConditionalSpinner loading={loading}>
        <CommentsViewContainer setReference={setReference} />
        <CommentsViewControl reference={reference} clearReference={clearReference} />
      </ConditionalSpinner>
    </>
  );
};

export default withCommentsContainer(CommentsView);
