import React from 'react';
import {User} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../navigators/RootNavigator';
import {Text} from 'native-base';

type UserLinkProps = {
  user: User;
};

export const UserLink = ({user}: UserLinkProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const isAnotherUser = account.id !== user.id;

  const goToUser = (): void => navigation.navigate('UserView', {user});

  return !isAnotherUser ? (
    <Text color="primary.500" onPress={goToUser}>
      {user.username}
    </Text>
  ) : (
    <Text>{user.username}</Text>
  );
};

export default UserLink;
