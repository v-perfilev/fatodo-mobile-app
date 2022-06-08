import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {RootNavigationProp, RootParamList} from '../../../navigators/RootNavigator';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions, CommentsThunks} from '../../../store/comments/commentsActions';
import {ColorScheme} from '../../themes/ThemeFactory';

export type WithCommentsProps = {
  loading: boolean;
  colorScheme: ColorScheme;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<RootParamList, 'withComments'>>();
  const routeTargetId = route.params.targetId;
  const routeColorScheme = route.params.colorScheme;
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const goBack = (): void => navigation.goBack();

  const loadComments = (): void => {
    dispatch(CommentsActions.init(routeTargetId));
    dispatch(CommentsThunks.fetchComments({targetId: routeTargetId, offset: 0}))
      .unwrap()
      .catch((status) => (status !== 404 ? goBack() : null))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeTargetId && routeTargetId !== targetId) {
      loadComments();
    } else if (!routeTargetId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return <Component loading={loading} colorScheme={routeColorScheme} {...props} />;
};

export default withCommentsContainer;
