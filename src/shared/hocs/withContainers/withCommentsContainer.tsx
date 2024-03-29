import React, {ComponentType, useCallback, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {ProtectedNavigationProps, ProtectedParamList} from '../../../navigators/ProtectedNavigator';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions} from '../../../store/comments/commentsActions';
import {ColorScheme} from '../../themes/ThemeFactory';
import {InfoActions} from '../../../store/info/infoActions';
import InfoSelectors from '../../../store/info/infoSelectors';

export type WithCommentsProps = {
  targetId: string;
  containerLoading: boolean;
  color: ColorScheme;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const navigation = useNavigation<ProtectedNavigationProps>();
  const [containerLoading, setContainerLoading] = useDelayedState(true, 500);
  const route = useRoute<RouteProp<ProtectedParamList, 'withComments'>>();
  const routeTargetId = route.params.targetId;
  const routeColorScheme = route.params.colorScheme;
  const targetId = useAppSelector(CommentsSelectors.targetId);
  const shouldLoad = useAppSelector(CommentsSelectors.shouldLoad);
  const commentThreadSelector = useCallback(InfoSelectors.makeCommentThreadSelector(), []);
  const commentThread = useAppSelector((state) => commentThreadSelector(state, targetId));

  const goBack = (): void => navigation.goBack();

  const loadComments = (): void => {
    dispatch(CommentsActions.init(routeTargetId));
    dispatch(CommentsActions.fetchCommentsThunk({targetId: routeTargetId, offset: 0}))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setContainerLoading(false));
  };

  const reloadComments = (): void => {
    dispatch(CommentsActions.fetchCommentsAfterRestartThunk({targetId, offset: 0}))
      .unwrap()
      .catch(() => goBack());
  };

  const refreshComments = (): void => {
    dispatch(InfoActions.refreshCommentThreadsThunk(targetId));
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

  useEffect(() => {
    if (isFocused && targetId && shouldLoad) {
      reloadComments();
    }
  }, [isFocused, shouldLoad]);

  useEffect(() => {
    if (isFocused && targetId && commentThread?.unread > 0) {
      refreshComments();
    }
  }, [isFocused, targetId, commentThread]);

  return <Component targetId={targetId} containerLoading={containerLoading} color={routeColorScheme} {...props} />;
};

export default withCommentsContainer;
