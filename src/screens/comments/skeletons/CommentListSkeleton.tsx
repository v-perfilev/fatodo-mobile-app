import React, {memo} from 'react';
import {COMMENT_SKELETON_HEIGHT, HEADER_HEIGHT, TAB_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import {Box} from 'native-base';
import CommentSkeleton from './CommentSkeleton';
import {Dimensions} from 'react-native';

const CommentListSkeleton = () => {
  const height = Dimensions.get('window').height - HEADER_HEIGHT - TAB_HEIGHT;
  const count = Math.floor(height / COMMENT_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

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
