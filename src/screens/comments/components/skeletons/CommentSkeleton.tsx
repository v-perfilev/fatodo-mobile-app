import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from 'native-base';

const CommentSkeleton = () => {
  return (
    <FHStack w="100%" p="2" defaultSpace>
      <Skeleton mt="2" w="35px" h="35px" rounded="3xl" />
      <FHStack grow>
        <Skeleton flexGrow="1" h="60px" />
      </FHStack>
    </FHStack>
  );
};

export default memo(CommentSkeleton);
