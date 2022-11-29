import React from 'react';
import {User} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProp} from '../../navigators/ProtectedNavigator';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type UserLinkProps = {
  user?: User;
  color?: string;
};

export const UserLink = ({user, color = 'primary.500'}: UserLinkProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const account = useAppSelector(AuthSelectors.account);
  const isAnotherUser = account.id !== user?.id;

  const goToUser = (): void => navigation.navigate('UserView', {user});

  let text = user?.username;
  if (user?.deleted) {
    text = t('common:links.userDeleted');
  }

  return user ? (
    <Text color={isAnotherUser ? color : undefined} onPress={isAnotherUser ? goToUser : undefined}>
      {text}
    </Text>
  ) : null;
};

export default UserLink;
