import React from 'react';
import {HStack, Skeleton, VStack} from 'native-base';

const GroupListCardItemSkeleton = () => {
  return (
    <HStack my="1" px="1" py="1" borderWidth="1" borderColor="gray.100" borderRadius="2">
      <HStack alignItems="center">
        <Skeleton mx="1" w="6" h="6" rounded="lg" />
        <VStack mx="1">
          <Skeleton w="4" h="4" rounded="md" />
          <Skeleton w="4" h="4" mt="1" rounded="md" />
        </VStack>
      </HStack>
      <VStack flex="1" mx="2" justifyContent="center">
        <Skeleton.Text size="14" lines={1} />
        <Skeleton.Text size="11" lines={1} w="30%" mt="1" />
      </VStack>
      <HStack alignItems="center">
        <Skeleton w="6" h="6" rounded="lg" />
      </HStack>
    </HStack>
  );
};

export default GroupListCardItemSkeleton;
