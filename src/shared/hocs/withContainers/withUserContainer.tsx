import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {RootNavigationProp, RootParamList} from '../../../navigators/RootNavigator';
import {User} from '../../../models/User';
import UserSelectors from '../../../store/user/userSelectors';
import {UserActions} from '../../../store/user/userActions';

export type WithUserProps = {
  user?: User;
  loading: boolean;
};

const withUserContainer = (Component: ComponentType<WithUserProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<RootParamList, 'withUser'>>();
  const routeUser = route.params.user;
  const routeUserId = route.params.userId;
  const user = useAppSelector(UserSelectors.user);

  const goBack = (): void => navigation.goBack();

  const selectUser = (): void => {
    dispatch(UserActions.selectUserThunk(routeUser))
      .unwrap()
      .then(() => setLoading(false));
  };

  const loadUser = (): void => {
    dispatch(UserActions.fetchUserThunk(routeUserId))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeUser && routeUser.id !== user?.id) {
      selectUser();
    } else if (routeUserId && routeUserId !== user?.id) {
      loadUser();
    } else if (!routeUser && !routeUserId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return <Component loading={loading} user={user || routeUser} {...props} />;
};

export default withUserContainer;
