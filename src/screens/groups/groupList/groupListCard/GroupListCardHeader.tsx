import {UserAccount} from '../../../../models/User';
import React, {FC} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, Text} from 'native-base';

type Props = {
  account: UserAccount;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader: FC<Props> = ({account, sorting, drag}: Props) => {
  const {group} = useGroupViewContext();

  return (
    <Box px="2" py="1.5" bg="primary.500">
      <Text fontWeight="600" fontSize="14" color="white">
        {group.title}
      </Text>
    </Box>
  );
};

export default GroupListCardHeader;
