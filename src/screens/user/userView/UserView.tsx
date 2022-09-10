import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React from 'react';
import Header from '../../../components/layouts/Header';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import UserViewGroups from './UserViewGroups';
import UserViewControl from './UserViewControl';
import UserViewRelations from './UserViewRelations';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import Separator from '../../../components/layouts/Separator';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  return (
    <>
      <Header />
      <ConditionalSpinner loading={loading}>
        <SimpleScrollView>
          <FVStack defaultSpace>
            <UserFullView user={user} />
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

export default withUserContainer(UserView);
