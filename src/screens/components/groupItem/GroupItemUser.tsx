import React, {useCallback} from 'react';
import {Item} from '../../../models/Item';
import {Text} from 'native-base';
import {useAppSelector} from '../../../store/store';
import InfoSelectors from '../../../store/info/infoSelectors';
import UserLink from '../../../components/links/UserLink';
import {Group} from '../../../models/Group';

type GroupItemUserProps = {
  group: Group;
  item: Item;
};

const GroupItemUser = ({group, item}: GroupItemUserProps) => {
  const userSelector = useCallback(InfoSelectors.makeUserSelector(), []);
  const user = useAppSelector((state) => userSelector(state, item.createdBy));

  return (
    <Text fontSize="xs" color="gray.400">
      <UserLink user={user} color={`${group.color}.500`} /> /{' '}
    </Text>
  );
};

export default GroupItemUser;
