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
    <FHStack>
      <UrlPic alt={user.username} url={user.imageFilename} size="md" border={1} />
      <Text>{user.username}</Text>
      <CheckboxInput onPress={toggleSelected} isSelected={isSelected} />
    </FHStack>
  );
};

export default UsersSelectItem;
