import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProps} from '../../../navigators/GroupNavigator';

const ItemListHeader = () => {
  const groupNavigation = useNavigation<GroupNavigationProps>();

  const goToGroupList = (): void => {
    groupNavigation.replace('GroupList');
  };

  return (
    <Header
      showAvatar
      hideGoBack
      afterTitle={<ArrowDownIcon color="primary.500" size="lg" mt="1" />}
      onTitleClick={goToGroupList}
    />
  );
};

export default memo(ItemListHeader);
