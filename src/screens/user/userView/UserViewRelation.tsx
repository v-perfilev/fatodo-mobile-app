import React from 'react';
import PressableButton from '../../../components/controls/PressableButton';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationProp} from '../../../navigators/RootNavigator';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import UserView from '../../../components/views/UserView';

type UserViewRelationProps = {
  relation: ContactRelationWithUser;
};

const UserViewRelation = ({relation}: UserViewRelationProps) => {
  const navigation = useNavigation<RootNavigationProp>();

  const goToUserView = (): void => navigation.navigate('UserView', {user: relation.user});

  return (
    <PressableButton onPress={goToUserView}>
      <UserView user={relation.user} withUsername picSize="md" />
    </PressableButton>
  );
};

export default UserViewRelation;
