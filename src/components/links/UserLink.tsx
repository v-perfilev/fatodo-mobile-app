import React from 'react';
import {User} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../navigators/ProtectedNavigator';
import {Text} from 'native-base';

type UserLinkProps = {
  user?: User;
  color?: string;
};

export const UserLink = ({user, color = 'primary.500'}: UserLinkProps) => {
  const navigation = useNavigation<ProtectedNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const isAnotherUser = account.id !== user?.id;

  const goToUser = (): void => navigation.navigate('UserView', {user});

  return user ? (
    <Text color={isAnotherUser ? color : undefined} onPress={isAnotherUser ? goToUser : undefined}>
      {user.username}
    </Text>
  ) : null;
};

export default UserLink;
