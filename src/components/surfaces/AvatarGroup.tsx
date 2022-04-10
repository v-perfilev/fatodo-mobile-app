import React, {FC} from 'react';
import {Box, HStack, Pressable, Text} from 'native-base';
import {User} from '../../models/User';
import {AVATARS_IN_CARD} from '../../constants';
import UserView from '../views/UserView';

type AvatarGroupProps = {
  users: User[];
  onClick?: () => void;
  withInvertedBorder?: boolean;
};

const AvatarGroup: FC<AvatarGroupProps> = ({users, onClick, withInvertedBorder}) => {
  const usersToShow = users.slice(0, AVATARS_IN_CARD);
  const moreThanLimit = users.length > AVATARS_IN_CARD ? users.length - AVATARS_IN_CARD : 0;

  return (
    <Pressable onPress={onClick}>
      <HStack ml="3" alignItems="center">
        {usersToShow.map((user, index) => (
          <Box ml="-3" key={index}>
            <UserView user={user} picSize="9" withInvertedBorder={withInvertedBorder} />
          </Box>
        ))}
        {moreThanLimit > 0 && (
          <Text ml="1" fontWeight="bold">
            +{moreThanLimit}
          </Text>
        )}
      </HStack>
    </Pressable>
  );
};

export default AvatarGroup;
