import React, {FC, memo} from 'react';
import {Box, Text, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {Item} from '../../../../models/Item';

type GroupListCardContentProps = {
  items: Item[];
  count: number;
  loading: boolean;
};

const GroupListCardContent: FC<GroupListCardContentProps> = ({items, count, loading}) => {
  return (
    <Box bg="white">
      {!loading && count > 0 && (
        <VStack py="1">
          {items.map((item) => (
            <Box px="2" py="1" key={item.id}>
              <Text>{item.title}</Text>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default flowRight([memo])(GroupListCardContent);
