import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {ProtectedNavigationProp, ProtectedParamList} from '../../../navigators/ProtectedNavigator';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {ColorScheme} from '../../themes/ThemeFactory';

export type WithCommentsProps = {
  targetId: string;
  containerLoading: boolean;
  color: ColorScheme;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<ProtectedNavigationProp>();
  const [containerLoading, setContainerLoading] = useDelayedState(true, 500);
  const route = useRoute<RouteProp<ProtectedParamList, 'withComments'>>();
  const routeTargetId = route.params.targetId;
  const routeColorScheme = route.params.colorScheme;
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const goBack = (): void => navigation.goBack();

  const loadComments = (): void => {
    dispatch(CommentsActions.init(routeTargetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId: routeTargetId, offset: 0}))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setContainerLoading(false));
  };

  useEffect(() => {
    if (routeTargetId && routeTargetId !== targetId) {
      loadComments();
    } else if (!routeTargetId) {
      goBack();
    } else {
      setContainerLoading(false);
    }
  }, []);

  return <Component targetId={targetId} containerLoading={containerLoading} color={routeColorScheme} {...props} />;
};

export default withCommentsContainer;
