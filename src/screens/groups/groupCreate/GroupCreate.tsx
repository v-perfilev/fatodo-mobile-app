import React, {FC} from 'react';
import {ScrollView} from 'native-base';
import {flowRight} from 'lodash';
import withHeader from '../../../shared/hocs/withHeader';
import GroupForm from '../groupForm/GroupForm';
import ItemService from '../../../services/ItemService';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../../navigators/GroupNavigator';
import {useSnackContext} from '../../../shared/contexts/SnackContext';

const GroupCreate: FC = () => {
  const navigation = useNavigation<GroupNavigationProp>();
  const {handleCode, handleResponse} = useSnackContext();

  const goToGroupView = (id: string): void => {
    navigation.navigate('GroupView', {groupId: id});
  };
  const goToGroupList = (): void => navigation.navigate('GroupList');

  const request = (formData: FormData, stopSubmitting: () => void): void => {
    ItemService.createGroup(formData)
      .then((response) => {
        handleCode('group.created', 'info');
        const id = response.data.id;
        goToGroupView(id);
      })
      .catch((response) => {
        handleResponse(response);
        stopSubmitting();
      });
  };
  return (
    <ScrollView px="3" py="1">
      <GroupForm request={request} cancel={goToGroupList} />
    </ScrollView>
  );
};

export default flowRight([withHeader])(GroupCreate);
