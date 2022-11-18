import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {ProtectedNavigationProp, ProtectedParamList} from '../../../navigators/ProtectedNavigator';
import {User} from '../../../models/User';
import UserSelectors from '../../../store/user/userSelectors';
import {UserActions} from '../../../store/user/userActions';

export type WithUserProps = {
  user?: User;
  containerLoading: boolean;
};

const withUserContainer = (Component: ComponentType<WithUserProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const [containerLoading, setContainerLoading] = useDelayedState(true, 500);
  const route = useRoute<RouteProp<ProtectedParamList, 'withUser'>>();
  const routeUser = route.params.user;
  const routeUserId = route.params.userId;
  const user = useAppSelector(UserSelectors.user);

  const goBack = (): void => navigation.goBack();

  const selectUser = (): void => {
    dispatch(UserActions.selectUserThunk(routeUser))
      .unwrap()
      .then(() => setContainerLoading(false));
  };

  const loadUser = (): void => {
    dispatch(UserActions.fetchUserThunk(routeUserId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setContainerLoading(false));
  };

  useEffect(() => {
    if (routeUser && routeUser.id !== user?.id) {
      selectUser();
    } else if (routeUserId && routeUserId !== user?.id) {
      loadUser();
    } else if (!routeUser && !routeUserId) {
      goBack();
    } else {
      setContainerLoading(false);
    }
  }, []);

  return <Component containerLoading={containerLoading} user={user || routeUser} {...props} />;
};

export default withUserContainer;
