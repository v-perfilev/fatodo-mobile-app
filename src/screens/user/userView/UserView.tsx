import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import {Divider} from 'native-base';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import {flowRight} from 'lodash';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  return (
    <>
      <Header />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <FVStack defaultSpace>
            <UserFullView user={user} />
            <Divider bg="secondary.500" />
            <UserViewControl user={user} />
            <Divider bg="secondary.500" />
            <UserViewGroups />
            <Divider bg="secondary.500" />
            <UserViewRelations />
          </FVStack>
        </SimpleScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([memo, withUserContainer])(UserView);
