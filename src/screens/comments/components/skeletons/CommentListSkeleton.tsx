import React, {memo} from 'react';
import {COMMENT_SKELETONS_COUNT} from '../../../../constants';
import FVStack from '../../../../components/boxes/FVStack';
import {Box} from 'native-base';
import CommentSkeleton from './CommentSkeleton';

const CommentListSkeleton = () => {
  const indexArray = Array.from(Array(COMMENT_SKELETONS_COUNT).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          <CommentSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(CommentListSkeleton);
