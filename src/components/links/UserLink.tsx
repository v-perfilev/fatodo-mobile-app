import React from 'react';
import {User} from '../../models/User';
import {useAppSelector} from '../../store/store';
import AuthSelectors from '../../store/auth/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {ProtectedNavigationProps} from '../../navigators/ProtectedNavigator';
import {Text} from 'native-base';
import {UserUtils} from '../../shared/utils/UserUtils';
import {useTranslation} from 'react-i18next';

type UserLinkProps = {
  user?: User;
  color?: string;
  noLink?: boolean;
};

export const UserLink = ({user, color = 'primary.500', noLink}: UserLinkProps) => {
  const navigation = useNavigation<ProtectedNavigationProps>();
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const isAnotherUser = account.id !== user?.id;
  const isNotDeleted = user && !user.deleted;
  const text = UserUtils.getUsername(user, t);

  const goToUser = (): void => navigation.navigate('UserView', {user});

  return (
    <Text
      color={isAnotherUser && isNotDeleted && !noLink ? color : undefined}
      onPress={isAnotherUser && isNotDeleted && !noLink ? goToUser : undefined}
    >
      {text}
    </Text>
  );
};

export default UserLink;
