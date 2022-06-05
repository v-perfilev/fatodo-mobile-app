import React from 'react';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import withCommentsContainer, {WithCommentsProps} from '../../../shared/hocs/withContainers/withCommentsContainer';
import CommentsViewHeader from './CommentsViewHeader';
import CommentsViewControl from './CommentsViewControl';
import CommentsViewContainer from './CommentsViewContainer';

type CommentsViewProps = WithCommentsProps;

const CommentsView = ({loading}: CommentsViewProps) => {
  return (
    <>
      <CommentsViewHeader />
      <ConditionalSpinner loading={loading}>
        <CommentsViewContainer />
        <CommentsViewControl />
      </ConditionalSpinner>
    </>
  );
};

export default withCommentsContainer(CommentsView);
