import React from 'react';
import {User} from '../../../models/User';
import {Text} from 'native-base';
import UrlPic from '../../surfaces/UrlPic';
import CheckboxInput from '../../controls/CheckboxInput';
import FHStack from '../../boxes/FHStack';

type UsersSelectInputProps = {
  user: User;
  isSelected: boolean;
  toggleSelected: () => void;
};

const UsersSelectItem = ({user, isSelected, toggleSelected}: UsersSelectInputProps) => {
  return (
    <FHStack grow alignItems="center">
      <FHStack grow smallSpace alignItems="center">
        <UrlPic file={user.imageFilename} size="sm" border={1} />
        <Text isTruncated>{user.username}</Text>
      </FHStack>
      <CheckboxInput onPress={toggleSelected} isSelected={isSelected} />
    </FHStack>
  );
};

export default UsersSelectItem;
