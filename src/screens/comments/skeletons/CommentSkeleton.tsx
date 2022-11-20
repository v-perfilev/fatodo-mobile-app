import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {COMMENT_SKELETON_HEIGHT} from '../../../constants';

const CommentSkeleton = () => {
  return (
    <FHStack w="100%" h={`${COMMENT_SKELETON_HEIGHT}px`} p="2" space="3">
      <Skeleton mt="2" w="35px" h="35px" rounded="full" />
      <FHStack grow>
        <Skeleton flexGrow="1" h="58px" rounded="xl" />
      </FHStack>
    </FHStack>
  );
};

export default memo(CommentSkeleton);
