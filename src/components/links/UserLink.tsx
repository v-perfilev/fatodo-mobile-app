import React from 'react';
import {User} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../navigators/ProtectedNavigator';
import {Text} from 'native-base';
import {useTranslation} from 'react-i18next';

type UserLinkProps = {
  user?: User;
  color?: string;
  noLink?: boolean;
};

export const UserLink = ({user, color = 'primary.500', noLink}: UserLinkProps) => {
  const {t} = useTranslation();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const account = useAppSelector(AuthSelectors.account);
  const isAnotherUser = account.id !== user?.id;

  const goToUser = (): void => navigation.navigate('UserView', {user});

  let text = user?.username;
  if (user?.deleted) {
    text = t('common:links.userDeleted');
  }

  return user ? (
    <Text
      color={isAnotherUser && !noLink ? color : undefined}
      onPress={isAnotherUser && !noLink ? goToUser : undefined}
    >
      {text}
    </Text>
  ) : null;
};

export default UserLink;
