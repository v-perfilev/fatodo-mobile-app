import React, {useEffect} from 'react';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {GroupNavigationProp, GroupParamList} from '../../../navigators/GroupNavigator';
import GroupForm from '../groupForm/GroupForm';
import ConditionalSpinner from '../../../components/surfaces/ConditionalSpinner';
import FScrollView from '../../../components/surfaces/FScrollView';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import SnackActions from '../../../store/snack/snackActions';
import GroupSelectors from '../../../store/group/groupSelectors';
import GroupThunks from '../../../store/group/groupThunks';
import {useLoadingState} from '../../../shared/hooks/useLoadingState';

const GroupEdit = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<GroupNavigationProp>();
  const route = useRoute<RouteProp<GroupParamList, 'GroupEdit'>>();
  const groupId = route.params.groupId;
  const group = useAppSelector(GroupSelectors.group);
  const groupLoading = useAppSelector(GroupSelectors.loading);
  const [loading, setLoading] = useLoadingState();

  const goToGroupView = (): void => navigation.navigate('GroupView', {groupId});

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    dispatch(GroupThunks.updateGroup(formData))
      .unwrap()
      .then(() => {
        dispatch(SnackActions.handleCode('group.updated', 'info'));
        goToGroupView();
      })
      .catch(() => {
        stopSubmitting();
      });
  };

  useEffect(() => {
    setLoading(true);
    dispatch(GroupThunks.fetchGroup(groupId))
      .unwrap()
      .catch(() => goToGroupView());
  }, [groupId]);

  useEffect(() => {
    if (!groupLoading) {
      setLoading(false);
    }
  }, [groupLoading]);

  return (
    <ConditionalSpinner loading={loading}>
      <FScrollView>
        <GroupForm group={group} request={request} cancel={goToGroupView} />
      </FScrollView>
    </ConditionalSpinner>
  );
};

export default flowRight([withHeader])(GroupEdit);
