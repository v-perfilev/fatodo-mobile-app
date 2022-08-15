import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React from 'react';
import Header from '../../../components/layouts/Header';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import {Divider, ScrollView} from 'native-base';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import {DEFAULT_SPACE} from '../../../constants';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  return (
    <>
      <Header hideLogo />
      <ConditionalSpinner loading={loading}>
        <ScrollView p={DEFAULT_SPACE}>
          <FVStack defaultSpace>
            <UserFullView user={user} />
            <Divider bg="secondary.500" />
            <UserViewControl user={user} />
            <Divider bg="secondary.500" />
            <UserViewGroups />
            <Divider bg="secondary.500" />
            <UserViewRelations />
          </FVStack>
        </ScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default withUserContainer(UserView);
