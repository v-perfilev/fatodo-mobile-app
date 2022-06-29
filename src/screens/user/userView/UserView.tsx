import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React from 'react';
import Header from '../../../components/layouts/Header';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import FScrollView from '../../../components/boxes/FScrollView';
import UserViewGroups from './UserViewGroups';
import {Divider} from 'native-base';
import UserViewControl from './UserViewControl';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  return (
    <>
      <Header hideLogo />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <UserFullView user={user} />
            <Divider bg="secondary.500" />
            <UserViewControl user={user} />
            <Divider bg="secondary.500" />
            <UserViewGroups />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default withUserContainer(UserView);
