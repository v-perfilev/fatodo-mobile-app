import React from 'react';
import {User} from '../../../models/User';
import {Text} from 'native-base';
import UrlPic from '../../surfaces/UrlPic';
import Checkbox from '../../controls/Checkbox';
import FHStack from '../../boxes/FHStack';

type UsersSelectInputProps = {
  user: User;
  isSelected: boolean;
  toggleSelected: () => void;
};

const UsersSelectItem = ({user, isSelected, toggleSelected}: UsersSelectInputProps) => {
  return (
    <FHStack grow alignItems="center">
      <FHStack grow space="1" alignItems="center">
        <UrlPic file={user.imageFilename} size="sm" border={1} />
        <Text isTruncated>{user.username}</Text>
      </FHStack>
      <Checkbox onPress={toggleSelected} checked={isSelected} />
    </FHStack>
  );
};

export default UsersSelectItem;
