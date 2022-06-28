import withUserContainer, {WithUserProps} from '../../../shared/hocs/withContainers/withUserContainer';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import React from 'react';
import Header from '../../../components/layouts/Header';
import UserFullView from '../../../components/views/UserFullView';
import FVStack from '../../../components/boxes/FVStack';
import FScrollView from '../../../components/boxes/FScrollView';
import {useAppSelector} from '../../../store/store';
import UserSelectors from '../../../store/user/userSelectors';

type UserViewProps = WithUserProps;

const UserView = ({user, loading}: UserViewProps) => {
  const groups = useAppSelector(UserSelectors.groups);

  console.log(groups);

  return (
    <>
      <Header hideLogo />
      <ConditionalSpinner loading={loading}>
        <FScrollView>
          <FVStack defaultSpace>
            <UserFullView user={user} />
          </FVStack>
        </FScrollView>
      </ConditionalSpinner>
    </>
  );
};

export default withUserContainer(UserView);
