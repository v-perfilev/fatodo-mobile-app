import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'native-base';
import {ItemInfo} from '../../models/Item';
import {TabNavigationProp} from '../../navigators/TabNavigator';

type ItemLinkProps = {
  item?: ItemInfo;
  color?: string;
};

export const ItemLink = ({item, color = 'primary.500'}: ItemLinkProps) => {
  const navigation = useNavigation<TabNavigationProp>();

  const goToItem = (): void => navigation.navigate('Groups', {screen: 'ItemView', params: {itemId: item?.id}});

  return item ? (
    <Text color={color} onPress={goToItem}>
      {item.title}
    </Text>
  ) : undefined;
};

export default ItemLink;
