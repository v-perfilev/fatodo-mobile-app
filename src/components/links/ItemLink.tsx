import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ItemInfo} from '../../models/Item';
import {TabNavigationProp} from '../../navigators/TabNavigator';

type ItemLinkProps = {
  item: ItemInfo;
};

export const ItemLink = ({item}: ItemLinkProps) => {
  const navigation = useNavigation<TabNavigationProp>();

  const goToItem = (): void => navigation.navigate('Groups', {screen: 'ItemView', params: {itemId: item.id}});

  return (
    <Text color="primary.500" onPress={goToItem}>
      {item.title}
    </Text>
  );
};

export default ItemLink;
