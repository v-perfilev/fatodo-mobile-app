import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {GroupNavigationProp} from '../../navigators/GroupNavigator';
import {Text} from 'native-base';
import {ItemInfo} from '../../models/Item';

type ItemLinkProps = {
  item: ItemInfo;
};

export const ItemLink = ({item}: ItemLinkProps) => {
  const navigation = useNavigation<GroupNavigationProp>();

  const goToItem = (): void => navigation.navigate('ItemView', {itemId: item.id});

  return (
    <Text color="primary.500" onPress={goToItem}>
      {item.title}
    </Text>
  );
};

export default ItemLink;
