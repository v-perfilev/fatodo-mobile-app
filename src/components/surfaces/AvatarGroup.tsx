import React from 'react';
import {Box, Text} from 'native-base';
import {User} from '../../models/User';
import {AVATARS_IN_CARD} from '../../constants';
import UserView from '../views/UserView';
import FHStack from '../boxes/FHStack';
import {ColorScheme} from '../../shared/themes/ThemeFactory';

type AvatarGroupProps = {
  users: User[];
  colorScheme?: ColorScheme;
  withInvertedBorder?: boolean;
};

const AvatarGroup = ({users, colorScheme, withInvertedBorder}: AvatarGroupProps) => {
  const usersToShow = users.slice(0, AVATARS_IN_CARD);
  const moreThanLimit = users.length > AVATARS_IN_CARD ? users.length - AVATARS_IN_CARD : 0;

  return (
    <FHStack space="1" alignItems="center">
      <FHStack ml="3">
        {usersToShow.map((user, index) => (
          <Box ml="-3" key={index}>
            <UserView user={user} picSize="9" colorScheme={colorScheme} withInvertedBorder={withInvertedBorder} />
          </Box>
        ))}
      </FHStack>
      {moreThanLimit > 0 && <Text fontWeight="bold">+{moreThanLimit}</Text>}
    </FHStack>
  );
};

export default AvatarGroup;
