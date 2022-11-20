import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React, {memo} from 'react';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import Separator from '../../../components/layouts/Separator';
import UserViewHeader from './UserViewHeader';
import {flowRight} from 'lodash';

type UserViewProps = WithUserProps;

const UserView = ({user, containerLoading}: UserViewProps) => {
  return (
    <>
      <UserViewHeader />
      <ConditionalSpinner loading={containerLoading}>
        <SimpleScrollView>
          <FVStack space="3">
            <UserFullView user={user} withoutUsername />
            <Separator bg="secondary.500" />
            <UserViewControl user={user} />
            <Separator bg="secondary.500" />
            <UserViewGroups />
            <Separator bg="secondary.500" />
            <UserViewRelations />
          </FVStack>
        </SimpleScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default flowRight([memo, withUserContainer])(UserView);
