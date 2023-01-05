import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';
import {COMMENT_SKELETON_HEIGHT} from '../../../constants';

const CommentSkeleton = () => {
  return (
    <FHStack h={`${COMMENT_SKELETON_HEIGHT}px`} px="4" alignItems="center">
      <FHStack w="100%" space="3">
        <Skeleton mt="2" w="35px" h="35px" rounded="full" />
        <FHStack grow>
          <Skeleton flexGrow="1" h="69px" rounded="xl" />
        </FHStack>
      </FHStack>
    </FHStack>
  );
};

export default memo(CommentSkeleton);
