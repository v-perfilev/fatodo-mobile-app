import {UserAccount} from '../../../../models/User';
import React, {FC} from 'react';
import {useGroupViewContext} from '../../../../shared/contexts/viewContexts/groupViewContext';
import {Box, HStack, Text} from 'native-base';
import UrlPic from '../../../../components/surfaces/UrlPic';

type Props = {
  account: UserAccount;
  sorting: boolean;
  drag: () => void;
};

const GroupListCardHeader: FC<Props> = ({account, sorting, drag}: Props) => {
  const {group} = useGroupViewContext();

  const linearGradient = {
    linearGradient: {
      colors: ['primary.500', 'primary.300'],
      start: [0, 0],
      end: [1, 1],
    },
  };

  return (
    <Box h="45px" px="1" bg={linearGradient} justifyContent="center">
      <HStack space="2" alignItems="center">
        {group.imageFilename && <UrlPic url={group.imageFilename} size="9" border={1} invertedBorder />}
        <Text fontWeight="600" fontSize="14" color="white">
          {group.title}
        </Text>
      </HStack>
    </Box>
  );
};

export default GroupListCardHeader;
