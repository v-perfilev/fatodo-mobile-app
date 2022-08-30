import React, {useMemo} from 'react';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import UserView from '../../../components/views/UserView';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import {User} from '../../../models/User';

type UserViewRelationProps = {
  relation: ContactRelation;
};

const UserViewRelation = ({relation}: UserViewRelationProps) => {
  const navigation = useNavigation<RootNavigationProp>();
  const users = useAppSelector(InfoSelectors.users);

  const user = useMemo<User>(() => users.get(relation.secondUserId), [users]);

  const goToUserView = (): void => navigation.navigate('UserView', {user});

  return (
    <PressableButton onPress={goToUserView}>
      <UserView user={user} withUsername picSize="md" />
    </PressableButton>
  );
};

export default UserViewRelation;
