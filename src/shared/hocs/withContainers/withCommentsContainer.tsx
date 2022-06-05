import React, {ComponentType, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useDelayedState} from '../../hooks/useDelayedState';
import {RootNavigationProp, RootParamList} from '../../../navigators/RootNavigator';
import CommentsSelectors from '../../../store/comments/commentsSelectors';
import {CommentsActions, CommentsThunks} from '../../../store/comments/commentsActions';

export type WithCommentsProps = {
  loading: boolean;
};

const withCommentsContainer = (Component: ComponentType<WithCommentsProps>) => (props: any) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<RootNavigationProp>();
  const [loading, setLoading] = useDelayedState();
  const route = useRoute<RouteProp<RootParamList, 'withComments'>>();
  const routeTargetId = route.params.targetId;
  const targetId = useAppSelector(CommentsSelectors.targetId);

  const goBack = (): void => navigation.goBack();

  const loadComments = async (): Promise<void> => {
    await dispatch(CommentsActions.init());
    dispatch(CommentsThunks.fetchComments({targetId, offset: 0}))
      .unwrap()
      .catch(() => goBack())
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (routeTargetId && routeTargetId !== targetId) {
      loadComments().finally();
    } else if (!routeTargetId) {
      goBack();
    } else {
      setLoading(false);
    }
  }, []);

  return <Component loading={loading} {...props} />;
};

export default withCommentsContainer;
