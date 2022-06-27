import React, {memo} from 'react';
import Header from '../../../components/layouts/Header';
import {useNavigation} from '@react-navigation/native';
import {flowRight} from 'lodash';
import IconButton from '../../../components/controls/IconButton';
import {AccountNavigationProp} from '../../../navigators/AccountNavigator';
import EditIcon from '../../../components/icons/EditIcon';

const AccountViewHeader = () => {
  const navigation = useNavigation<AccountNavigationProp>();

  const goToAccountForm = (): void => navigation.navigate('AccountForm');

  return (
    <Header hideGoBack>
      <IconButton colorScheme="white" size="xl" p="1.5" icon={<EditIcon />} onPress={goToAccountForm} />
    </Header>
  );
};

export default flowRight([memo])(AccountViewHeader);
